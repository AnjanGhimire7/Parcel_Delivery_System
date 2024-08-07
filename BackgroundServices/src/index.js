import connectDB from "./database/db.js";
import dotenv from "dotenv";
import { SendParcelPendingEmail } from "./EmailServices/PendingParcel.js";
import { SendParcelDeliveredEmail } from "./EmailServices/deliverdParcel.js";
import cron from "node-cron";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {

    const run = () => {
      cron.schedule("* * * * * *", async () => {

        await SendParcelPendingEmail();
        await SendParcelDeliveredEmail();
      });
    };

    run();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running on the port:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed!!!", error);
  });
