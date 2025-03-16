import axios, { AxiosResponse } from "axios";
import { call, put, spawn, takeEvery, takeLatest } from "redux-saga/effects";

/// * libs
import Axios from "../../../libs/Axios";

/// * actions
import {
  UI_ERROR_HANDLER,
  UI_SEND_TEST_REQUEST,
  USER_LOGOUT,
} from "../../actions";

/// * classes
import LoggerClient from "../../../libs/LoggerClient";

const logger = new LoggerClient("uiSaga", { color: "orange" });

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* sendTestRequestSaga() {
  function* send() {
    try {
      const response: AxiosResponse = yield call(Axios.get, "/test");

      const data: { message: string } = response.data;

      logger.debug("requestTestRoute", data);
    } catch (error) {
      logger.debugError(error);
    }
  }

  yield takeEvery(UI_SEND_TEST_REQUEST, send);
}

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* errorHandlerSaga() {
  function* handle({ payload: error }: { payload: any }) {
    console.error("ERROR HANDLER", error);

    if (axios.isAxiosError(error)) {
      const err = error.toJSON();
      if (error?.status === 401) {
        yield put(USER_LOGOUT());
      } else {
        console.error(err);
      }
    }
  }

  yield takeLatest(UI_ERROR_HANDLER, handle);
}

function* uiSaga() {
  yield spawn(errorHandlerSaga);
  yield spawn(sendTestRequestSaga);
}

export default uiSaga;
