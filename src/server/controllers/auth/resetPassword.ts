import httpStatus from "http-status";
import { Response, Request, NextFunction } from "express";
import crypto from "crypto";
import { validationResult } from "express-validator";

import { User } from "../../../entity/User";
import { sendPasswordResetEmail } from "../../../utils/email";
import { Client } from "../../../entity/Client";

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        code: httpStatus.UNPROCESSABLE_ENTITY,
        message: errors.array(),
      });
    }
    const { email, refClient } = req.body;

    const user = await User.findOne({
      email,
    });

    const client = await Client.findOne({
      ref_client: refClient,
    });

    if (!client || !user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        code: httpStatus.BAD_REQUEST,
        message: "Aucun compte trouver avec pour ce client",
      });
    }

    const token = crypto.randomBytes(64).toString("hex");
    user.reset_password_token = token;
    user.reset_password_expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
    await user.save();
    await sendPasswordResetEmail(user);

    return res.status(200).send({
      message: "Un email vous a été envoyer",
    });
  } catch (err) {
    next(err);
  }
};
