import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";

class TestController {
  static async sendSuccess(req: Request, res: Response) {
    res.send({ messsage: "success" });
  }

  static async sendError(req: Request, res: Response, next: NextFunction) {
    const error = httpErrors(httpStatus.INTERNAL_SERVER_ERROR, "error");
    next(error);
  }
}

export default TestController;
