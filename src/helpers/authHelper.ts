/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { validationResult, Result } from "express-validator";
import { ResponseHandler } from "../helpers";
import { COMMON_ERROR, JWT, USER_ERROR } from "../constants/constant";
import * as StatusCodes from "http-status-codes";
import * as jwt from "jsonwebtoken";
import { IUser } from "../modules/user/user.type";
import { Messages } from "../constants";
import { AppError } from "./appError";

export class AuthHelper {
  public async validation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const errors: Result<{}> = validationResult(req);
      if (!errors.isEmpty()) {
        res.locals.data = errors.array();
        throw new Error("ValidationError");
      } else {
        next();
      }
    } catch (err) {
      res.locals.errorCode = COMMON_ERROR.INVALID_PARAMETER;
      res.locals.statusCode = StatusCodes.BAD_REQUEST;
      res.locals.data.message = err.message;
      res.locals.name = "ValidationError";
      ResponseHandler.JSONERROR(req, res, "validation");
    }
  }

  public generateToken(
    user: any,
    jwtSecret: string,
    jwtConfig: object
  ): string {
    const newToken = jwt.sign(user, jwtSecret, jwtConfig);
    return newToken;
  }

  public async guard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token: any = req.headers.authorization;
      if (token) {
        const auth: any = jwt.verify(token, JWT.secret);
        if (auth) {
          req.body.loggedinUserId = auth.id;
          req.body.loggedinUsername = auth.name;
          req.body.email = auth.email;
          next();
        } else {
          throw new AppError(
            StatusCodes.BAD_REQUEST,
            USER_ERROR.INAVALID_CREDENTIAL,
            Messages.UNAUTHORIZED
          );
        }
      } else {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          USER_ERROR.INAVALID_CREDENTIAL,
          Messages.UNAUTHORIZED
        );
      }
    } catch (err) {
      res.locals = {};
      res.locals.data = err;
      res.locals.errorCode = COMMON_ERROR.UNAUTHORIZED_USER;
      res.locals.message = "AuthenticationError";
      res.locals.statusCode = StatusCodes.UNAUTHORIZED;
      ResponseHandler.JSONERROR(req, res, "guard");
    }
  }
}
