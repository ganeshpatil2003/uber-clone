import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jsonWebToken from "jsonwebtoken";
import { Captain } from "../models/Captain.module.js";
const captainAuth = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "User is not loggedin.");
    }

    const decodedToken = jsonWebToken.verify(token,process.env.ACCESS_SECRET);
    const user = await Captain.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(400, "Unauthorized User.");
    }
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error?.message || "Unauthorized user."));
  }
});

export { captainAuth };
