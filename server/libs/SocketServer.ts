import * as cookie from "cookie";
import http from "http";
import io, { Socket } from "socket.io";

/// * classes
import Logger, { EConsoleColorName } from "./Logger";
import Auth from "./Auth";

/// * config
import config from "../config";

const logger = new Logger("socketServer", {
  console: {
    style: {
      color: EConsoleColorName.Blue,
    },
  },
});

class SocketServer {
  /** @type {} */
  static #instance: io.Server;

  /// o ******************************************************************************
  /// o ******************************************************************************
  /// o ******************************************************************************
  static init(httpServer: http.Server): void {
    if (this.#instance) {
      return;
    }

    logger.log({ message: "Inizializzazione server di Socket.io" });

    const url = new URL(config.server.url);
    console.log(url);

    this.#instance = new io.Server(httpServer, {
      cors: {
        origin: config.isProduction ? url.origin : true,
        credentials: true,
      },
      path: url.pathname.replace(/\/$/, "") + "/socket.io",
    });

    this.#instance.on("connection", async (clientSocket: Socket) => {
      try {
        logger.log({
          message: `Connessione client socket.io id ${clientSocket.id}`,
        });

        const cookies = cookie.parse(
          String(clientSocket.handshake.headers.cookie || "")
        );

        const user = await Auth.verifyJWT(cookies[Auth.cookieName] || "");
        if (user) {
          logger.log({
            message: `Utente ${user.username} connesso alla socket`,
          });

          user.subscribeToSocketIoRooms(clientSocket);
        }
      } catch (error: any) {
        clientSocket.disconnect(error.statusCode);
      }
    });
  }

  /// b ******************************************************************************
  /// b ******************************************************************************
  /// b ******************************************************************************
  static async emitToUser(clientId: string, event: string, data?: any) {
    this.#instance.to([clientId]).emit(event, data);
  }

  /// b ******************************************************************************
  /// b ******************************************************************************
  /// b ******************************************************************************
  static async broadcast(event: string, data?: any) {
    this.#instance.emit(event, data);
  }
}

export default SocketServer;
