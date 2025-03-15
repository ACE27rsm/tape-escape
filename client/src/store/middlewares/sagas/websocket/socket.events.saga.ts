import { Socket } from "socket.io-client";

/// * libs
import LoggerClient from "../../../../libs/LoggerClient";

const logger = new LoggerClient("socketEvent", { color: "green" });

/// = ? 4) SEPARATAMENTE GESTISCO GLI EVENTI CHE DEVE GESTIRE LA WS
export default function* socketEvents(
  socket: Socket,
  { type, data }: { type: string; data: any }
) {
  switch (type) {
    /// = + LOG *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    case "log":
      yield;
      logger.debug(data);
      break;

    default:
      break;
  }
}
