import { Router } from "express";
import {
  addParcel,
  getAllParcel,
  getOneParcel,
  updateParcel,
  deleteParcel,
  getUserParcel,
} from "../controllers/parcel.controller.js";
import { UserRolesEnum } from "../constant.js";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/create").post(verifyJWT, addParcel);
router
  .route("/")
  .get(verifyJWT, verifyPermission([UserRolesEnum.ADMIN]), getAllParcel);
router.route("/oneparcel/:parcelId").get(verifyJWT, getOneParcel);
router.route("/userparcel").get(verifyJWT, getUserParcel);
router.route("/updateparcel/:parcelId").patch(verifyJWT, updateParcel);
router.route("/deleteparcel/:parcelId").delete(verifyJWT, deleteParcel);

export default router;
