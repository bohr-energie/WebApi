import { IErrorWithCode } from "./interfaces";

export const throwError = (code: number, msg: string) => {
  const error: IErrorWithCode = new Error(msg);
  error.code = code;
  throw error;
};
