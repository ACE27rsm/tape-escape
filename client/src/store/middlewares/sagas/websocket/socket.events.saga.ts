import { Socket } from "socket.io-client";

/// * libs
import LoggerClient from "../../../../libs/LoggerClient";

/// * actions
import { MOVIES_RENTED_TOGGLE } from "../../../actions";
import { put, select } from "redux-saga/effects";
import { RootState } from "@/store";

const logger = new LoggerClient("socketEvent", { color: "green" });

/// = ? 4) SEPARATAMENTE GESTISCO GLI EVENTI CHE DEVE GESTIRE LA WS
export default function* socketEvents(
  //@ts-ignore
  socket: Socket,
  { type, data }: { type: string; data: any }
) {
  switch (type) {
    /// = + LOG *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    case "log":
      yield;
      logger.debug(data);
      break;

    /// = l MOVIES -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    case "movieRented":
      const store: RootState = yield select();

      yield put(
        MOVIES_RENTED_TOGGLE({
          movieId: data.movieId,
          rented: true,
          rentedByThisUser: store.user.username === data.userId,
        })
      );
      logger.debug(data);
      break;

    /// l -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    case "movieReturned":
      yield put(
        MOVIES_RENTED_TOGGLE({
          movieId: data.movieId,
          rented: false,
          rentedByThisUser: false,
        })
      );
      logger.debug(data);
      break;

    default:
      break;
  }
}
