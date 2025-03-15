import { sagaMiddleware } from "./sagas";
import config from "../../config";
import logger from "./logger.middlewares";

const middlewares = (): any => {
  const middlewaresArray: any[] = [sagaMiddleware];

  if (!config.isProduction) {
    middlewaresArray.push(logger);
  }

  return middlewaresArray;
};

export default middlewares;
