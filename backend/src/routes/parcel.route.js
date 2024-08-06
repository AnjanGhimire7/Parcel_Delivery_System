import { Router } from "express";
import { addParcel } from "../controllers/parcel.controller.js";
const router = Router();

router.route("/create").post(addParcel)

export default router;
