import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
const userSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function(password){
  
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
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

userSchema.methods.generateRefreshToken = async function () {
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

const User = model("User", userSchema);

export { User };
