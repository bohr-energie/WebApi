import httpStatus from "http-status";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";
import { User } from "../../../entity/User";
import { Login } from "../../../entity/Login";
import { generateToken, passwordHash } from "../../../utils/auth";
import { sendAccountActivationEmail } from "../../../utils/email";

export const setPassword = async (
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
    const { token, password, resetCount } = req.body;

    const user = await User.findOne(
      {
        reset_password_token: token,
      },
      {
        relations: ["client"],
      }
    );

    if (!user || new Date(user.reset_password_expires) < new Date()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        code: httpStatus.BAD_REQUEST,
        message: "Vote token a expiré réinitialiser mot de passe a nouveau!",
      });
    }

    if (resetCount) {
      const login = await Login.findOne({ client: user.client });
      if (!login) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal error!",
        });
      }
      login.count = 0;
      await login.save();

      return res.status(200).send({
        message: "Vous pouvez réessayez votre ancien mot de passe",
      });
    }

    await Login.delete({ client: user.client });
    const login = await Login.create({
      client: user.client,
      count: 0,
      password_hash: await passwordHash(password),
    });

    await login.save();

    user.reset_password_token = "";
    await user.save();

    const jwtoken = generateToken({ ...user });

    // decode the token to get the expire date
    const decoded = jwt.decode(jwtoken, { complete: true });

    return res.status(200).send({
      id_token: jwtoken,
      timeStamp: Date.now(),
      id_token_expires_in: new Date(decoded?.payload.exp * 1000),
    });
  } catch (err) {
    next(err);
  }
};
