import { Express } from "express";
import {
  validateCredentials,
  validateUserInfo,
  validatePasswordReset,
  validateSetPassword,
  validateSendMail,
} from "../../utils/validation";
import { login } from "../controllers/auth/login";
import { register } from "../controllers/auth/register";
import { setPassword } from "../controllers/auth/setPassword";
import { resetPassword } from "../controllers/auth/resetPassword";
import { sendEmail } from "../controllers/auth/sendEmail";

const setupAuthRoutes = (app: Express) => {
  app.post("/auth", validateCredentials(), login);
  app.post("/register", validateUserInfo(), register);
  app.post("/password", validateSetPassword(), setPassword);
  app.post("/reset", validatePasswordReset(), resetPassword);
  app.post("/sendmail", validateSendMail(), sendEmail);
};

export default setupAuthRoutes;
