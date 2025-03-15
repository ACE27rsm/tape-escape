import { NextFunction, Request, Response } from "express";

const httpErrors = require("http-errors");
const httpStatus = require("http-status");

class TestController {
  static async sendSuccess(req: Request, res: Response) {
    res.send({ messsage: "success" });
  }

  static async sendError(req: Request, res: Response, next: NextFunction) {
    const error = httpErrors(httpStatus.status.INTERNAL_SERVER_ERROR, "error");
    next(error);
  }
}

export default TestController;
