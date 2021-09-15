import httpStatus from "http-status";
import { Response, Request, NextFunction } from "express";
import crypto from "crypto";
import { validationResult } from "express-validator";

import { User } from "../../../entity/User";
import { sendContactEmail, sendPasswordResetEmail } from "../../../utils/email";
import { Client } from "../../../entity/Client";

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { email, name, company, phone, message } = req.body;

    await sendContactEmail(email, name, company, message, phone);

    return res.status(200).send({
      message: "Votre message a été envoyé",
    });
  } catch (err) {
    next(err);
  }
};
