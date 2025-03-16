import { NextFunction, Request, Response } from "express";

const httpErrors = require("http-errors");
const httpStatus = require("http-status");

/// * libs
import Auth from "../libs/Auth";
import JWT from "@/libs/JWT";

/// * static
import config from "../config";

class AuthController {
  static cookieName = "tape-escape-jwt";

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await Auth.login(req.body.username, req.body.password);

      const jwt = await JWT.sign(user);

      res.cookie(this.cookieName, jwt, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: config.isProduction,
        sameSite: config.isProduction ? "lax" : undefined,
      });

      res.send(user);
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie(this.cookieName, "", {
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
