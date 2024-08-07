import connectDB from "./database/db.js";
import dotenv from "dotenv";
import { SendParcelPendingEmail } from "./EmailServices/PendingParcel.js";
import cron from "node-cron";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const run =  () => {
      cron.schedule("* * * * * *", async () => { // send mail after every second
      

        await SendParcelPendingEmail();
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
