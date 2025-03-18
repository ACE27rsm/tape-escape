import { AxiosResponse } from "axios";
import {
  all,
  call,
  debounce,
  delay,
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
  MOVIES_RENT_MOVIE,
  MOVIES_RENTED_TOGGLE,
  MOVIES_RETURN_MOVIE,
} from "../../actions";

/// * types
import { Movies, TMDB, IMovieListPayload } from "../../../../../types";

const logger = new LoggerClient("movieSaga", { color: "pink" });

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* returnMovie() {
  function* get({ payload: movieId }: { payload: number }) {
    try {
      yield put(
        MOVIES_RENTED_TOGGLE({
          movieId,
          rented: false,
          rentedByThisUser: false,
        })
      );

      yield call(Axios.post, `/movies/return`, { movieId });
    } catch (error) {
      logger.debugError(error);
      yield put(UI_ERROR_HANDLER(error));
      yield put(
        MOVIES_RENTED_TOGGLE({ movieId, rented: true, rentedByThisUser: true })
      );
    }
  }

  yield takeLatest(MOVIES_RETURN_MOVIE, get);
}

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* rentMovie() {
  function* get({ payload: movieId }: { payload: number }) {
    try {
      yield put(
        MOVIES_RENTED_TOGGLE({ movieId, rented: true, rentedByThisUser: true })
      );

      yield call(Axios.post, `/movies/rent`, { movieId });
    } catch (error) {
      logger.debugError(error);
      yield put(UI_ERROR_HANDLER(error));
      yield put(
        MOVIES_RENTED_TOGGLE({
          movieId,
          rented: false,
          rentedByThisUser: false,
        })
      );
    }
  }

  yield takeLatest(MOVIES_RENT_MOVIE, get);
}

/// y *****************************************
/// y *****************************************
/// y *****************************************
function* getMovieDetails() {
  function* get({ payload: movieId }: { payload: number }) {
    try {
      yield put(MOVIES_DETAILS_FETCHING(true));
      yield put(MOVIES_DETAILS_SET(null));

      const [response]: AxiosResponse[] = yield all([
        call(Axios.get, `/movies/movie/${movieId}`),
        delay(200),
      ]);

      const data: Movies.MovieDetails = response.data;

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

      const [response]: AxiosResponse[] = yield all([
        call(Axios.get, "/movies", {
          params: payload,
        }),
        delay(200),
      ]);

      const data: Movies.MovieList = response.data;

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
  yield spawn(returnMovie);
  yield spawn(rentMovie);
  yield spawn(getMovieDetails);
  yield spawn(getDebouncedMovieList);
  yield spawn(getMovieList);
  yield spawn(getGenres);
}

export default movieSaga;
