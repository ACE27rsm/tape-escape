import { Dispatch, Middleware, UnknownAction } from "@reduxjs/toolkit";

/// * middlewares
import logger from "./logger.middlewares";
import { sagaMiddleware } from "./sagas";

/// * config
import config from "../../config";

const middlewares = (
  routerMiddleware: Middleware<{}, any, Dispatch<UnknownAction>>
): any => {
  const middlewaresArray: any[] = [sagaMiddleware, routerMiddleware];

  if (!config.isProduction) {
    middlewaresArray.push(logger);
  }

  return () => middlewaresArray;
};

export default middlewares;
