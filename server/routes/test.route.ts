import express from "express";

/// * controllers
import TestController from "../controllers/test.controller";

const router = express.Router();

router.route("/").get(TestController.sendSuccess);
router.route("/error").get(TestController.sendError);

export default router;
