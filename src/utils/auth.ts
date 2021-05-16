import config from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { IUser } from "../utils/interfaces";

const secret = config.jwtPrivateKey || "khgdfg@@dgf456--,;";

// generate a json web token
export const generateToken = (user: IUser) => {
  return jwt.sign(user, secret, {
    expiresIn: config.jwtExpiration || "30d",
  });
};

// verify if a token is still valid
export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

// compare the password sent by the user and the hashed one we have in th db
export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const passwordHash = (password: string) => {
  return bcrypt.hash(password, 10);
};
