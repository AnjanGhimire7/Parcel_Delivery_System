import mongoose, { Schema } from "mongoose";

import {

  AvailableUserRoles,
  UserRolesEnum,
  AvailableOrderStatus,
  OrderStatusEnum,
} from "../constant.js";

const userSchema = new Schema(
  {
    avatar: {
      url: {
        type: String, // cloudinary url
        required: true,
      },

      public_id: {
        type: String,
        required: true,
      },
    },

    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: AvailableOrderStatus,
      default: OrderStatusEnum.PENDING,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);