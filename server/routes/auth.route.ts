import express from "express";

/// * controllers
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.route("/login").post(AuthController.login);
router.route("/logout").post(AuthController.logout);

export default router;
