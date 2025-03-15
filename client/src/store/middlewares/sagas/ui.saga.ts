import { AxiosResponse } from "axios";
import { call, spawn, takeEvery } from "redux-saga/effects";

/// * libs
import Axios from "../../../libs/Axios";

/// * actions
import { UI_SEND_TEST_REQUEST } from "../../actions";

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

function* uiSaga() {
  yield spawn(sendTestRequestSaga);
}

export default uiSaga;
