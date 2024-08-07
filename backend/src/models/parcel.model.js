import mongoose, { Schema } from "mongoose";
import { AvailableOrderStatus, OrderStatusEnum } from "../constant.js";
const parcelSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    sendername: {
      type: String,
      required: true,
    },
    recipientname: {
      type: String,
      required: true,
    },
    senderemail: {
      type: String,
      required: true,
    },
    recipientemail: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    date: {
      type: String,
    },
    feedback: {
      type: String,
    },
    status: {
      type: String,
      enum: AvailableOrderStatus,
      required: true,
      default: OrderStatusEnum.CANCELLED,
    },
  },
  {
    timestamps: true,
  }
);

export const Parcel = mongoose.model("Parcel", parcelSchema);
