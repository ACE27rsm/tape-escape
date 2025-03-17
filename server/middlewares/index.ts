import httpStatus from "http-status";
import httpErrors from "http-errors";
import express from "express";

/// * libs
import Auth from "../libs/Auth";

/// * types
import { IRequestWithAuth } from "../../types";

class Middlewares {
  static async checkAuth(
    req: IRequestWithAuth,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const jwt = req.cookies[Auth.cookieName];
      if (!jwt) {
        throw httpErrors(httpStatus.UNAUTHORIZED, "Missing JWT");
      }

      req.user = (await Auth.verifyJWT(jwt)).data;
      next();
    } catch (error) {
      next(error);
    }
  }

  // /**
  //  * Legge l'intestazione http Cookie per identificare l'utente.
  //  *
  //  * @param {Object} options
  //  * @param {string} [options.cookieName] Il nome del cookie usato per l'autenticazione
  //  *
  //  * @returns {import("express").RequestHandler}
  //  */
  // static identifyByCookie = (options) => {
  //   options = Object.assign(
  //     {
  //       cookieName: SessionService.cookieName,
  //     },
  //     options
  //   );

  //   return function (
  //     req: IRequestWithAuth,
  //     res: express.Response,
  //     next: express.NextFunction
  //   ) {
  //     // Se nella richiesta è stato indicato un header authorization e il jwt è stato verificato, non leggiamo neanche il cookie.
  //     if (req.user) {
  //       return next();
  //     }

  //     const cookieValue = req.cookies[options.cookieName];

  //     if (!cookieValue) {
  //       return next();
  //     }

  //     _identify(req, res, next, cookieValue).then(next).catch(next);
  //   };
  // };
}

export default Middlewares;
