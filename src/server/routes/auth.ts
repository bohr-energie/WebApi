import { Express } from "express";
import {
  validateCredentials,
  validateUserInfo,
  validatePasswordReset,
  validateSetPassword,
} from "../../utils/validation";
import { login } from "../controllers/auth/login";
import { register } from "../controllers/auth/register";
import { setPassword } from "../controllers/auth/setPassword";
import { resetPassword } from "../controllers/auth/resetPassword";

const setupAuthRoutes = (app: Express) => {
  app.post("/auth", validateCredentials(), login);
  app.post("/register", validateUserInfo(), register);
  app.post("/password", validateSetPassword(), setPassword);
  app.post("/reset", validatePasswordReset(), resetPassword);
};

export default setupAuthRoutes;
