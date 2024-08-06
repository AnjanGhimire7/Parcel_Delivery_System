import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parcel } from "../models/parcel.model.js";
const addParcel = asyncHandler(async (req, res) => {
  const newParcel = await Parcel(req.body);
  if (!newParcel) {
    throw new ApiError(500, "failed to create parcel!!!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { newParcel }, "Sucessfully created the parcel")
    );
});
export { addParcel };
