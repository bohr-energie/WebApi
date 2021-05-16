import httpStatus from "http-status";
import { Response, Request, NextFunction } from "express";
import crypto from "crypto";

import { validationResult } from "express-validator";
import { User } from "../../../entity/User";
import { Client } from "../../../entity/Client";
import { Company } from "../../../entity/Company";
import { Contract } from "../../../entity/Contract";
import { sendAccountActivationEmail } from "../../../utils/email";

export const register = async (
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
    const {
      siret,
      ape,
      address,
      postalcode,
      city,
      pdl,
      name,
      last_name: lastName,
      email,
      phone,
      func,
      civility,
    } = req.body;

    const client = await Client.create({
      ref_client: name + lastName,
    }).save();

    if (!client) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Error!",
      });
    }

    const token = crypto.randomBytes(64).toString("hex");

    const user = await User.create({
      email: email.toLowerCase(),
      client,
      civility,
      name,
      last_name: lastName,
      phone,
      function: func,
      role: "TODO",
      reset_password_token: token,
      reset_password_expires: new Date(
        Date.now() + 60 * 60 * 24 * 1000
      ).toISOString(),
    })
      .save()
      .catch(async (error) => {
        // if email already exist delete client and send error
        await Client.delete({ id: client.id });
        throw error;
      });

    if (!user) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Error!",
      });
    }

    const company = await Company.create({
      client,
      company: "TODO",
      siret,
      ape,
      address,
      postalcode,
      city,
    }).save();

    if (!company) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Error!",
      });
    }

    const contract = await Contract.create({
      client,
      pdl,
    }).save();

    if (!contract) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Error!",
      });
    }

    await sendAccountActivationEmail(user);

    return res
      .status(201)
      .send({
        message:
          "Votre compte a été créé avec succès, verifier votre email pour activer votre compte",
      });
  } catch (err) {
    next(err);
  }
};
