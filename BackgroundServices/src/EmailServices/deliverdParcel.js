import { sendMail } from "../services/mail.service.js";
import { Parcel } from "../models/parcel.model.js";
import ejs from "ejs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { OrderStatusEnum } from "../constant.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, "../views/deliveredparcel.ejs");

const renderEmailTemplate = async (parcel) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      templatePath,
      {
        sendername: parcel.sendername,
        from: parcel.from,
        to: parcel.to,
        recipientname: parcel.recipientname,
        cost: parcel.cost,
        weight: parcel.weight,
        note: parcel.note,
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
};

const SendParcelDeliveredEmail = async () => {
  const BATCH_SIZE = 50;
  let skip = 0;

  try {
    while (true) {
      const parcels = await Parcel.find({ status: OrderStatusEnum.PENDING })
        .skip(skip)
        .limit(BATCH_SIZE);

      if (parcels.length === 0) {
        break;
      }

      await Promise.all(
        parcels.map(async (parcel) => {
          try {
            const emailData = await renderEmailTemplate(parcel);

            const senderEmailOptions = {
              from: process.env.EMAIL,
              to: parcel.senderemail,
              subject: "Your parcel has been delivered",
              html: emailData,
            };

            const recipientEmailOptions = {
              from: process.env.EMAIL,
              to: parcel.recipientemail,
              subject: "You have got the parcel",
              html: emailData,
            };

            await Promise.all([
              sendMail(senderEmailOptions),
              sendMail(recipientEmailOptions),
              Parcel.findByIdAndUpdate(parcel._id, {
                $set: { status: OrderStatusEnum.DELIVERED },
              }),
            ]);
          } catch (error) {
            console.error(
              `Failed to send email or update parcel status for parcel ID ${parcel._id}:`,
              error
            );
          }
        })
      );

      skip += BATCH_SIZE;
    }
  } catch (error) {
    console.error(
      "Error occurred while sending parcel delivered emails:",
      error
    );
  }
};

export { SendParcelDeliveredEmail };
