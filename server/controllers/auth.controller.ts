import { NextFunction, Request, Response } from "express";
const httpErrors = require("http-errors");
const httpStatus = require("http-status");

/// * libs
import JWT from "@/libs/JWT";
import Auth from "../libs/Auth";

/// * static
import config from "../config";

class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await Auth.login(req.body.username, req.body.password);

      const jwt = await JWT.sign(user.data);

      res.cookie(Auth.cookieName, jwt, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: config.isProduction,
        sameSite: config.isProduction ? "lax" : undefined,
      });

      res.send(user.data);
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie(Auth.cookieName, "", {
        expires: new Date(0),
        httpOnly: true,
        secure: config.isProduction,
        sameSite: config.isProduction ? "lax" : undefined,
      });

      res.end();
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
