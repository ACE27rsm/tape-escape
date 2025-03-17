import express from "express";

/// * routes
import authRoute from "./auth.route";
import moviesRoute from "./movies.route";
import testRotue from "./test.route";

const router = express.Router();

const appRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/movies",
    route: moviesRoute,
  },
  {
    path: "/test",
    route: testRotue,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
