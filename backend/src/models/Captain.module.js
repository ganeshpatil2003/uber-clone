import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
const captainSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    socketId: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      plate: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
      },
      vehicle: {
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
      },
    },
    location: {
      ltd: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

captainSchema.pre("save", async function (next) {
  if(this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
  }
});

captainSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

captainSchema.methods.generateAccessToken = async function () {
  return await jsonWebToken.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_EXPIRY,
    }
  );
};

captainSchema.methods.generateRefreshToken = async function () {
  return await jsonWebToken.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRY,
    }
  );
};

const Captain = model("Captain", captainSchema);

export { Captain };
