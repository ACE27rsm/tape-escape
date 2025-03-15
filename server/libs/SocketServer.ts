import * as cookie from "cookie";
import http from "http";
import io, { Socket } from "socket.io";

/// * classes
import Logger, { EConsoleColorName } from "./Logger";

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
  /**
   * ATTENZIONE! La funzione init deve essere usata dal file www.js che inizializza il server.
   */
  static init(httpServer: http.Server): void {
    if (this.#instance) {
      return;
    }

    logger.log({ message: "Inizializzazione server di Socket.io" });

    this.#instance = new io.Server(httpServer, {
      cors: {
        origin: config.isProduction ? config.server.origin : true,
        credentials: true,
      },
      path: config.server.origin + "/socket.io",
    });

    this.#instance.on("connection", async (clientSocket: Socket) => {
      logger.log({
        message: `Connessione client socket.io id ${clientSocket.id}`,
      });

      const cookies = cookie.parse(
        String(clientSocket.handshake.headers.cookie || "")
      );

      clientSocket.join(clientSocket.id);
    });
  }

  /// b ******************************************************************************
  /// b ******************************************************************************
  /// b ******************************************************************************
  /**
   * Usare proprietà "user._id" per indicare il destinatario.
   *
   * @param {IUser} [params.user] - utente
   * @param {string} params.event - Nome evento
   * @param {any} params.data - Dati dell'evento
   * @param {boolean} [params.wholeCompany] - Dati dell'evento
   */
  static async emitToUser(params: {
    clientId: string;
    event: string;
    data?: any;
  }) {
    this.#instance.to([params.clientId]).emit(params.event, params.data);
  }
}

export default SocketServer;
