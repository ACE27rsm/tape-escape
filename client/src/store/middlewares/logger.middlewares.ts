import { createLogger } from "redux-logger";

const logger = createLogger({
  predicate: (
    //@ts-ignore
    getState,
    action
  ) => action.type,
});

export default logger;
