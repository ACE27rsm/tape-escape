import express from "express";

/// * routes
import testRotue from "./test.route";

const router = express.Router();

const appRoutes = [
  {
    path: "/test",
    route: testRotue,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
