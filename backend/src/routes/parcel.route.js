import { Router } from "express";
import {addParcel} from "../controllers/parcel.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/create").post(verifyJWT, addParcel);

export default router;
