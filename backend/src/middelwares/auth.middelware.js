import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.module.js";
const auth = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "User is not loggedin.");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(decodedToken?._id).select(
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

export {auth};
