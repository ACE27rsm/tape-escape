import { createLogger } from "redux-logger";

const logger = createLogger({
  predicate: (getState, action) => action.type,
});

export default logger;
