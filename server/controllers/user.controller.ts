import { NextFunction, Request, Response } from "express";

/// * libs
import User from "../libs/User";

class UserController {
  static async getUserWithCrentials(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await User.getUsersWithCredentials();

      res.send(users);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
