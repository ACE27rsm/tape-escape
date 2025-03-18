import express from "express";

/// * controllers
import UserController from "../controllers/user.controller";

const router = express.Router();

router.route("/test-users").get(UserController.getUserWithCrentials);

export default router;
