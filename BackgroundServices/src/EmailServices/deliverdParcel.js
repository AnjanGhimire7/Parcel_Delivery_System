import { sendMail } from "../services/mail.service.js";
import { Parcel } from "../models/parcel.model.js";
import ejs from "ejs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { OrderStatusEnum } from "../constant.js";

const SendParcelDeliveredEmail = async () => {
  const parcels = await Parcel.find({ status: OrderStatusEnum.PENDING });

  if (parcels.length > 0) {
    for (let parcel of parcels) {
      const __dirname = dirname(fileURLToPath(import.meta.url));

      let pathname = path.join(__dirname, "../");
      ejs.renderFile(
        `${pathname}/deliveredparcel.ejs`,
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, data) => {
          let messageoption = {
            from: process.env.EMAIL,
            to: parcel.senderemail,
            subject: "Your parcel has been delivered",
            html: data,
          };

          try {
            sendMail(messageoption);
          } catch (error) {
            console.log(err);
          }
        }
      );

      ejs.renderFile(
        `${pathname}/deliveredparcel.ejs`,
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, data) => {
          let messageoption = {
            from: process.env.EMAIL,
            to: parcel.recipientemail,
            subject: "You have got the parcel",
            html: data,
          };

          try {
            sendMail(messageoption);
            await Parcel.findByIdAndUpdate(parcel._id, {
              $set: { status: OrderStatusEnum.DELIVERED },
            });
          } catch (error) {
            console.log(err);
          }
        }
      );
    }
  }
};
export { SendParcelDeliveredEmail };
