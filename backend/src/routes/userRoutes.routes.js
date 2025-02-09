import { Router } from "express";
import {
  getUser,
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { auth } from '../middelwares/auth.middelware.js';

const userRoutes = Router();

userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/logout").post(auth, logOutUser);
userRoutes.route("/").get(auth, getUser);
export { userRoutes };
