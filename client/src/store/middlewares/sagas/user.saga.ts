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
  takeLatest,
} from "redux-saga/effects";
import { push } from "redux-first-history";

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
  USER_LOGIN_TASKS,
  USER_LOGOUT,
  USER_RESET,
  USER_SET,
} from "../../actions";

/// * libs
import LoggerClient from "../../../libs/LoggerClient";

/// * types
import { Task } from "redux-saga";
import {
  IUserLoginPayload,
  IUserWithoutPassword,
} from "../../../../../types/User.types";

const logger = new LoggerClient("userSaga", { color: "orange" });

/// = g ******************************************************************
function* logInSaga(payload: IUserLoginPayload) {
  const { username, password } = payload;
  yield put(USER_FETCHING(true));
  try {
    console.log({ payload });
    const response: AxiosResponse = yield call(Axios.post, "/auth/login", {
      username,
      password,
    });

    const isCancelled: boolean = yield cancelled();
    if (!isCancelled) {
      yield put(USER_LOGIN_TASKS(response.data));
      yield put(push("/movies"));
    }
  } catch (error: any) {
    logger.debugError("LOGIN ERROR:", error);

    if (axios.isAxiosError(error) && error?.response?.status === 401) {
      if (error?.response?.status === 401) {
        yield put(
          USER_ERROR("Invalid username or password. Please try again.")
        );
      }
    } else {
      yield put(UI_ERROR_HANDLER(error));
    }
  } finally {
    yield put(USER_FETCHING(false));
  }
}

/// g ********************************************************************
function* logInTaskSaga() {
  function* runTasks({ payload: user }: { payload: IUserWithoutPassword }) {
    yield put(UI_SOCKET_START());
    yield put(USER_SET(user));
  }

  yield takeLatest(USER_LOGIN_TASKS, runTasks);
}

/// = ! ******************************************************************
function* logOutSaga() {
  function* logOut() {
    try {
      yield call(Axios.post, "/auth/logout");
    } catch (error) {
      logger.debugError(error);
    } finally {
      yield all([put(USER_RESET()), put(UI_SOCKET_STOP()), put(push("/login"))]);
    }
  }
  yield takeEvery(USER_LOGOUT.type, logOut);
}

/// = b ******************************************************************
function* userSaga() {
  yield spawn(logOutSaga);
  yield spawn(logInTaskSaga);

  while (true) {
    const { payload, type } = yield take([USER_LOGIN.type, USER_LOGOUT.type]);

    if (type === USER_LOGOUT.type) {
      yield put(UI_SOCKET_STOP());
    } else {
      const task: Task = yield fork(logInSaga, payload);

      yield take([USER_LOGOUT.type, USER_ERROR.type]);

      yield cancel(task);
    }
  }
}

export default userSaga;
