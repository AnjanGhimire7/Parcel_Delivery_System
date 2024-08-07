import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parcel } from "../models/parcel.model.js";
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

export { addParcel };
