import httpStatus from "http-status";
import httpErrors from "http-errors";

/// * libs
import Auth from "../libs/Auth";

class Middlewares {
  static async checkAuth(req: any, res: any, next: any) {
    try {
      const jwt = req.cookies["tape-escape-jwt"];
      if (!jwt) {
        throw httpErrors(httpStatus.UNAUTHORIZED, "Missing JWT");
      }

      req.user = (await Auth.verifyJWT(jwt)).data;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new Middlewares();
