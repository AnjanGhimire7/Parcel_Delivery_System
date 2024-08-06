import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resendEmailVerification,
  resetForgottenPassword,
  forgotPasswordRequest,
  verifyEmail,
  getAllUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../constant.js";
import { verifyPermission } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/forgot-password").get(verifyJWT, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .patch(verifyJWT, resetForgottenPassword);
router.route("/").get(getAllUser);
router
  .route("/:userId")
  .delete(verifyPermission([UserRolesEnum.ADMIN]), deleteUser);

export default router;
