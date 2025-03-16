import express from "express";

/// * routes
import testRotue from "./test.route";
import authRoute from "./auth.route";

const router = express.Router();

const appRoutes = [
  {
    path: "/test",
    route: testRotue,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
