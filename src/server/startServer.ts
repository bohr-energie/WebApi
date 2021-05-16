import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import config from "../config";
import { throwError } from "../utils/errors";
import { IErrorWithCode } from "../utils/interfaces";
import httpStatus from "http-status";
import setupAuthRoutes from "./routes/auth";

const PORT = parseInt(config.PORT || "5000", 10);

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(morgan("short"));

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));

  setupAuthRoutes(app);
  app.use(function (req: Request, _res: Response, next: NextFunction) {
    console.log("catch 404 and forward to error handler path =>", req.path);
    next(throwError(httpStatus.NOT_FOUND, "EndPoint not found!"));
  });

  // error handler
  app.use(function (
    err: IErrorWithCode,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    console.log("error handler", JSON.stringify(err, null, 2));
    // send error
    res.status(
      err.code
        ? err.code > 100 && err.code < 600
          ? err.code
          : httpStatus.INTERNAL_SERVER_ERROR
        : httpStatus.INTERNAL_SERVER_ERROR
    );
    res.send({
      code: err.code || httpStatus.INTERNAL_SERVER_ERROR,
      //@ts-ignore
      message: err.detail || err.message || "Internal Error !",
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`Users service listening on ${PORT}`);
  });
};

export default startServer;
