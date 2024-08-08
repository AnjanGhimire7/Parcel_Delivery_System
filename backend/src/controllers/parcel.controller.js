import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parcel } from "../models/parcel.model.js";
import { isValidObjectId } from "mongoose";
const addParcel = asyncHandler(async (req, res) => {
  const {
    from,
    to,
    sendername,
    recipientname,
    recipientemail,
    senderemail,
    status,
    cost,
    weight,
  } = req.body;
  if (
    [
      from,
      to,
      senderemail,
      recipientname,
      sendername,
      status,
      cost,
      weight,
    ].every((fields) => fields?.trim() === "")
  ) {
    throw new ApiError(400, "All the fields are required!!!");
  }
  const parcel = await Parcel.create({
    from,
    to,
    senderemail,
    sendername,
    recipientemail,
    recipientname,
    status,
    cost,
    weight,
  });
  if (!parcel) {
    throw new ApiError(500, "Failed to create the parcel!!!");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { parcel }, "Successfully created the parcel!!!")
    );
});
// get all the parcel
const getAllParcel = asyncHandler(async (req, res) => {
  const { page = 1, limit } = req.query;

  let pageLimit = parseInt(limit) || 4;
  const pageSkip = (page - 1) * pageLimit;

  const parcels = await Parcel.find()
    .sort({ createdAt: -1 }) //sort in descending order
    .skip(pageSkip)
    .limit(pageLimit);
  if (!parcels) {
    throw new ApiError(500, "Failed to fetched all the parcels!!!");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { parcels },
        "Successfully fetched all the parcels!!!"
      )
    );
});
//update parcel
const updateParcel = asyncHandler(async (req, res) => {
  const { parcelId } = req.params;
  if (!isValidObjectId(parcelId)) {
    throw new ApiError(400, "Invalid parcel id!!!");
  }
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new ApiError(500, "No parcel found!!!");
  }
  const parcelUpdate = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  if (!parcelUpdate) {
    throw new ApiError(500, "Failed to update the parcel!!!");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { parcelUpdate },
        "successfully updated the parcel!!!"
      )
    );
});
//get the user parcel
const getUserParcel = asyncHandler(async (req, res) => {
  const { page = 1, limit, email } = req.query;
  let pageLimit = parseInt(limit) || 4;
  const pageSkip = (page - 1) * pageLimit;

  if (!email) {
    throw new ApiError(401, "email is required!!!");
  }
  const parcels = await Parcel.find({ senderemail: email })
    .sort({ createdAt: -1 })
    .skip(pageSkip)
    .limit(pageLimit);
  if (!parcels) {
    throw new ApiError(500, "parcel not found!!!");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { parcels },
        "Successfully fetched all the parcels!!!"
      )
    );
});
//get one parcel on the basis of parcelId

const getOneParcel = asyncHandler(async (req, res) => {
  const { parcelId } = req.params;
  if (!isValidObjectId(parcelId)) {
    throw new ApiError(400, "Invalid parcel id!!!");
  }
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new ApiError(500, "No parcel found!!!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { parcel }, "successfully get the parcel!!!"));
});
const deleteParcel = asyncHandler(async (req, res) => {
  const { parcelId } = req.params;
  if (!isValidObjectId(parcelId)) {
    throw new ApiError(400, "Invalid parcel id!!!");
  }
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new ApiError(500, "No parcel found!!!");
  }
  await Parcel.findByIdAndDelete(parcelId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successsfully deleted the parcel!!!"));
});

export {
  addParcel,
  getAllParcel,
  updateParcel,
  getUserParcel,
  getOneParcel,
  deleteParcel,
};
