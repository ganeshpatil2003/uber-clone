import { Router } from "express";
import {
  captainLogin,
  captainLogout,
  captainRegister,
  getCaptain,
} from "../controllers/captain.controller.js";
import { captainAuth } from "../middelwares/captainAuth.middelware.js";

const captainRoutes = Router();

captainRoutes.route("/register").post(captainRegister);
captainRoutes.route("/login").post(captainLogin);
captainRoutes.route("/logout").post(captainAuth, captainLogout);
captainRoutes.route("/").get(captainAuth, getCaptain);
export { captainRoutes };
