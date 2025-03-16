import axios, { AxiosResponse } from "axios";
import {
  all,
  call,
  cancel,
  cancelled,
  fork,
  put,
  spawn,
  take,
  takeEvery,
} from "redux-saga/effects";

/// * libs
import Axios from "../../../libs/Axios";

/// * actions
import {
  UI_ERROR_HANDLER,
  UI_SOCKET_START,
  UI_SOCKET_STOP,
  USER_ERROR,
  USER_FETCHING,
  USER_LOGIN,
  USER_LOGOUT,
  USER_RESET,
  USER_SET,
} from "../../actions";

/// * libs
import LoggerClient from "../../../libs/LoggerClient";

/// * types
import { Task } from "redux-saga";
import { IUserLoginPayload } from "../../../../../types/User.types";

const logger = new LoggerClient("userSaga", { color: "orange" });

/// = g ******************************************************************
function* logInSaga(payload: IUserLoginPayload) {
  const { username, password } = payload;
  yield put(USER_FETCHING(true));
  try {
    const response: AxiosResponse = yield call(Axios.post, "/auth/login", {
      username,
      password,
    });

    const isCancelled: boolean = yield cancelled();
    if (!isCancelled) {
      yield put(UI_SOCKET_START());
      yield put(USER_SET(response.data));
    }
  } catch (error: any) {
    console.error(error);

    if (axios.isAxiosError(error) && error?.response?.status === 401) {
      if (error?.response?.status === 401) {
        yield put(
          USER_ERROR("Invalid username or password. Please try again.")
        );
      }
    } else {
      yield put(UI_ERROR_HANDLER(error));
    }
  }
}

/// = ! ******************************************************************
function* logOutSaga() {
  function* logOut() {
    try {
      yield call(Axios.post, "/auth/logout");
    } catch (error) {
      logger.debugError(error);
    } finally {
      yield all([put(USER_RESET()), put(UI_SOCKET_STOP())]);
    }
  }
  yield takeEvery(USER_LOGOUT.type, logOut);
}

/// = b ******************************************************************
function* userSaga() {
  yield spawn(logOutSaga);

  while (true) {
    const { payload } = yield take(USER_LOGIN.type);

    const task: Task = yield fork(logInSaga, payload);

    yield take([USER_LOGOUT.type, USER_ERROR.type]);

    yield cancel(task);
  }
}

export default userSaga;
