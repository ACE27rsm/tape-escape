import express from "express";

/// * controllers
import AuthController from "../controllers/auth.controller";

/// * middlewares
import Middlewares from "../middlewares";

const router = express.Router();

router.route("/login").post(AuthController.login);
router.route("/logout").post(AuthController.logout);
router.route("/validate").get(Middlewares.checkAuth, AuthController.validate);

export default router;
