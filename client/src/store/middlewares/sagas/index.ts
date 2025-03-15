import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";

/// * sagas
import uiSaga from "./ui.saga";
import socketSaga from "./websocket/socket.saga";

function* sagas() {
  yield spawn(uiSaga);
  yield spawn(socketSaga);
}

export const sagaMiddleware = createSagaMiddleware();

export const runSaga = () => sagaMiddleware.run(sagas);
