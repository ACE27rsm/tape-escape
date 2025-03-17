import { AxiosResponse } from "axios";
import {
  call,
  debounce,
  put,
  spawn,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

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
  MOVIES_LIST_GET_DEBOUNCED,
  MOVIES_DETAILS_FETCHING,
  MOVIES_DETAILS_GET,
  MOVIES_DETAILS_SET,
} from "../../actions";

/// * types
import { TMDB, IMovieListPayload } from "../../../../../types";

const logger = new LoggerClient("movieSaga", { color: "pink" });

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* getMovieDetails() {
  function* get({ payload: movieId }: { payload: number }) {
    try {
      yield put(MOVIES_DETAILS_FETCHING(true));
      yield put(MOVIES_DETAILS_SET(null));

      const response: AxiosResponse = yield call(
        Axios.get,
        `/movies/movie/${movieId}`
      );

      const data: TMDB.MovieDetails = response.data;

      yield put(MOVIES_DETAILS_SET(data));
    } catch (error) {
      logger.debugError(error);
      yield put(UI_ERROR_HANDLER(error));
    } finally {
      yield put(MOVIES_DETAILS_FETCHING(false));
    }
  }

  yield takeLatest(MOVIES_DETAILS_GET, get);
}

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* getMovieList() {
  function* get({ payload }: { payload: IMovieListPayload }) {
    try {
      yield put(MOVIES_LIST_FETCHING(true));

      const response: AxiosResponse = yield call(Axios.get, "/movies", {
        params: payload,
      });

      const data: TMDB.MovieList = response.data;

      yield put(MOVIES_LIST_SET({ ...data, query: payload.query }));
    } catch (error) {
      logger.debugError(error);
      yield put(UI_ERROR_HANDLER(error));
    } finally {
      yield put(MOVIES_LIST_FETCHING(false));
    }
  }

  yield takeLatest(MOVIES_LIST_GET, get);
}

function* getDebouncedMovieList() {
  yield debounce(1000, MOVIES_LIST_GET_DEBOUNCED, function* ({ payload }) {
    yield put(MOVIES_LIST_GET(payload));
  });
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
  yield spawn(getMovieDetails);
  yield spawn(getDebouncedMovieList);
  yield spawn(getMovieList);
  yield spawn(getGenres);
}

export default movieSaga;
