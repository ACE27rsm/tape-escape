import { buffers, eventChannel } from "redux-saga";
import { apply, call, fork, take } from "redux-saga/effects";
import io, { Socket } from "socket.io-client";

/// * libs
import LoggerClient from "../../../../libs/LoggerClient";

/// * config
import config from "../../../../config";

/// * actions
import { UI_SOCKET_START, UI_SOCKET_STOP } from "../../../actions";

/// * events
import socketEvents from "./socket.events.saga";

/// * global
export let _socket = {
  id: "",
};

/// * buffer degli eventi, default 10, ma se arrivano piu di 10 eventi contemporaneamente li perde, https://github.com/redux-saga/redux-saga/issues/1027
const socketBuffer = buffers.expanding<any>(100);

const logger = new LoggerClient("socket");

/// = ? 3) FUNZIONE DI CREAZIONE DEL CANALE SAGA SU GLI EVENTI IN ASCOLTO DALLA WS
function createSocketChannel(serviceWebSocket: Socket) {
  return eventChannel(
    (emit) => {
      /// = + -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
      /// = + Events-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
      /// = + -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

      /// + on connect *******************************************************************
      serviceWebSocket.on("connect", () => {
        _socket.id = serviceWebSocket.id!;
      });

      /// = + on LOG ***********************************************************************
      serviceWebSocket.on("log", (data: { message: string }) => {
        emit({ type: "log", data });
      });

      /// = l on MOVIES ********************************************************************
      serviceWebSocket.on("movieRented", (data: { message: string }) => {
        emit({ type: "movieRented", data });
      });

      serviceWebSocket.on("movieReturned", (data: { message: string }) => {
        emit({ type: "movieReturned", data });
      });

      /// = ! error
      serviceWebSocket.on("error", (errorEvent) => {
        logger.debugError("error", errorEvent);
      });

      return () => {
        serviceWebSocket.close();
      };
    },
    /// ? Gli passo il buffer, altrimenti le richieste che arrivano in contemporanea andrebbero perse
    socketBuffer
  );
}
/// = ? 2) LANCIO LA CREAZIONE DEL CANALE IN ASCOLTO E, FINCHE NON VIENE CHIUSA LA WS
/// = ? CICLO OGNI EVENTO. FACCIO UN CANALE IN MODO DA POTER FARE UN BUFFER DI EVENTI
function* watchForSocket(socket: Socket) {
  const socketChannel: string = yield call<any>(createSocketChannel, socket);
  while (true) {
    try {
      const socketPayload: { type: string; data: any } =
        yield take(socketChannel);

      yield call(socketEvents, socket, socketPayload);
    } catch (error) {
      console.error({ error, functionName: "watchForSocket" });
      /// o socketChannel is still open in catch block
      /// o if we want end the socketChannel, we need close it explicitly
      /// o valutare un eventuale dispatch di STOP_SOCKET
      /// o socketChannel.close()
    }
  }
}
/// = STRT 1) FACCIO PARTIRE LA WS AL LOGIN E LA CHIUDO AL LOG OUT
export default function* socketIO() {
  while (true) {
    yield take(UI_SOCKET_START.type);

    const url = config.apiURL;

    const socket: Socket = yield call(io, url, {
      forceNew: true,
      path: `${url}/socket.io/`,
      withCredentials: true,
    });

    yield apply(socket, socket.connect, []);

    yield fork(watchForSocket, socket);

    yield take(UI_SOCKET_STOP.type);

    yield apply(socket, socket.close, []);
  }
}
