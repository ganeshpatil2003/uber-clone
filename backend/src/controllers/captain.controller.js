import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Captain } from "../models/Captain.module.js";
import { ApiError } from "../utils/ApiError.js";

const options = {
  httpOnly: true,
  secure: true,
};
const captainRegister = asyncHandler(async (req, res) => {
  const { username, email, password, color, plate, capacity, vehicle } =
    req.body;
  if (
    [username, email, password, color, plate, vehicle].some((f) =>
      f ? f.trim() === "" : f === undefined
    ) ||
    capacity < 1
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }
  const captain = await Captain.find({ email });
  if (captain.length > 0) {
    throw new ApiError(400, "Captain already exists");
  }
  const newCaptain = await Captain.create({
    username,
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicle,
    },
  });
  if (!newCaptain) {
    throw new ApiError(400, "Captain not created");
  }
  const createdCaptain = await Captain.findById(newCaptain._id).select(
    "-password -refreshToken"
  );
  return res
    .status(201)
    .json(new ApiResponse(201, createdCaptain, "Captain created successfully"));
});

const captainLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please fill in all fields");
  }
  const captain = await Captain.findOne({ email });
  if (!captain) {
    throw new ApiError(400, "Invalid email or password");
  }
  const isPasswordCorrect = await captain.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid email or password");
  }
  const accessToken = await captain.generateAccessToken();
  const refreshToken = await captain.generateRefreshToken();
  captain.refreshToken = refreshToken;
  await captain.save();
  const createdCaptain = await Captain.findById(captain.id).select("-password");
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, createdCaptain, "Captain logged in successfully")
    );
});

const captainLogout = asyncHandler(async (req, res) => {
  await Captain.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Captain logged out successfully"));
});

const getCaptain = asyncHandler(async (req, res) => {
  const captain = await Captain.findById(req.user._id).select(
    "-password -refreshToken"
  );
  return res.status(200).json(new ApiResponse(200, captain, "Captain found"));
});

export { captainRegister, captainLogin, captainLogout, getCaptain };
