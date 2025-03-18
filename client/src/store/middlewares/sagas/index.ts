import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";

/// * sagas
import movieSaga from "./movies.saga";
import socketSaga from "./websocket/socket.saga";
import uiSaga from "./ui.saga";
import userSaga from "./user.saga";

function* sagas() {
  yield spawn(movieSaga);
  yield spawn(socketSaga);
  yield spawn(uiSaga);
  yield spawn(userSaga);
}

export const sagaMiddleware = createSagaMiddleware();

export const runSaga = () => sagaMiddleware.run(sagas);
