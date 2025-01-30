import { User } from "../models/User.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshTokens = async (id) => {
  const user = await User.findById(id);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken || "";
  await user.save();
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const user = await User.find({
    $or: [{ username }, { email }],
  });
  
  if (user.length > 0) {
    throw new ApiError(400, "User already exists");
  }
  const newUser = await User.create({
    username,
    email,
    password,
  });

  if (!newUser) {
    throw new ApiError(400, "User not created");
  }

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please fill in all fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not registered.");
  }
  
  const isValidPassword = await user.isPasswordCorrect(password);
  console.log(isValidPassword)
  if (!isValidPassword) {
    throw new ApiError(400, "Invalid Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  if (!accessToken || !refreshToken) {
    throw new ApiError(400, "Error while tokens creation");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, user, "User logged in successfully."));
});

const logOutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.refreshToken = "";
  await user.save();
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User loggedout successfully."));
});

export { registerUser, loginUser, logOutUser };
