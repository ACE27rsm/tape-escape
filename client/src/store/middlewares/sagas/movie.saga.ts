import { AxiosResponse } from "axios";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

/// * libs
import Axios from "../../../libs/Axios";
import LoggerClient from "../../../libs/LoggerClient";

/// * actions
import {
  MOVIES_GENRES_FETCHING,
  MOVIES_GENRES_GET,
  MOVIES_GENRES_SET,
  MOVIES_LIST_FETCHING,
  MOVIES_LIST_GET,
  MOVIES_LIST_SET,
  UI_ERROR_HANDLER,
} from "../../actions";

/// * types
import { TMDB } from "../../../../../types/TMDB.types";

const logger = new LoggerClient("movieSaga", { color: "pink" });

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* getMovieList() {
  function* get() {
    try {
      yield put(MOVIES_LIST_FETCHING(true));

      const response: AxiosResponse = yield call(Axios.get, "/movies");

      const data: TMDB.MovieList = response.data;

      yield put(MOVIES_LIST_SET(data));
    } catch (error) {
      logger.debugError(error);
      yield put(UI_ERROR_HANDLER(error));
    } finally {
      yield put(MOVIES_LIST_FETCHING(false));
    }
  }

  yield takeEvery(MOVIES_LIST_GET, get);
}

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* getGenres() {
  function* get() {
    try {
      yield put(MOVIES_GENRES_FETCHING(true));

      const response: AxiosResponse = yield call(Axios.get, "/movies/genres");

      const data: TMDB.Genre[] = response.data;

      yield put(MOVIES_GENRES_SET(data));
    } catch (error) {
      logger.debugError(error);
      yield put(UI_ERROR_HANDLER(error));
    } finally {
      yield put(MOVIES_GENRES_FETCHING(false));
    }
  }

  yield takeEvery(MOVIES_GENRES_GET, get);
}

function* movieSaga() {
  yield spawn(getMovieList);
  yield spawn(getGenres);
}

export default movieSaga;
