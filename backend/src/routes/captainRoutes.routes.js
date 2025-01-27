import { Router } from "express";
import {
  captainLogin,
  captainLogout,
  captainRegister,
} from "../controllers/captain.controller.js";
import { captainAuth } from "../middelwares/captainAuth.middelware.js";

const captainRoutes = Router();

captainRoutes.route("/register").post(captainRegister);
captainRoutes.route("/login").post(captainLogin);
captainRoutes.route("/logout").post(captainAuth, captainLogout);

export { captainRoutes };
