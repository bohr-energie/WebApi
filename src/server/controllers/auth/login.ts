import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import crypto from "crypto";

import httpStatus from "http-status";
import { Login } from "../../../entity/Login";
import { User } from "../../../entity/User";
import { comparePassword, generateToken } from "../../../utils/auth";
import { sendResetCountEmail } from "../../../utils/email";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        code: httpStatus.UNPROCESSABLE_ENTITY,
        message: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne(
      { email: email.toLowerCase() },
      {
        relations: ["client"],
      }
    );
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        code: httpStatus.UNAUTHORIZED,
        message: "Email introuvable!",
      });
    }

    const login = await Login.findOne({ client: user.client });
    if (!login) {
      return res.status(httpStatus.FORBIDDEN).json({
        code: httpStatus.FORBIDDEN,
        message:
          "Votre compte est désactiver veuillez l'activer ou réinitialiser votre mot de passe!",
      });
    }
    if (login.count >= 10) {
      const token = crypto.randomBytes(64).toString("hex");
      user.reset_password_token = token;
      user.reset_password_expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
      await user.save();
      await sendResetCountEmail(user);

      return res.status(httpStatus.FORBIDDEN).send({
        code: httpStatus.FORBIDDEN,
        message:
          "Vous avez saisi incorrectement votre mot de passe plus de 10 fois, pour votre sécurité un email de réactivation de votre compte a été envoyé",
      });
    }

    const match = await comparePassword(password, login.password_hash);

    if (!match) {
      login.count += 1;
      await login.save();
      return res.status(httpStatus.FORBIDDEN).send({
        code: httpStatus.FORBIDDEN,
        message:
          "Mot de passe incorrect. réessayez ou cliquez sur mot de passe oublié pour le réinitialiser",
      });
    }

    const token = generateToken({ ...user });

    // decode the token to get the expire date
    const decoded = jwt.decode(token, { complete: true });

    // reset login counter
    login.count = 0;
    await login.save();

    return res.status(200).send({
      id_token: token,
      timeStamp: Date.now(),
      id_token_expires_in: new Date(decoded?.payload.exp * 1000),
    });
  } catch (err) {
    next(err);
  }
};
