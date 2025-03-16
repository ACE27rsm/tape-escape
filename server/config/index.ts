import dotenv from "dotenv";
import path from "path";

/// * utils
import castStringToBoolean from "../utils/castStringToBoolean";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env.local"),
});
export interface IConfig {
  isProduction: boolean;
  server: {
    origin: string;
    port: number;
    url: string;
  };
  logger: {
    debugConsole: boolean;
  };
  slack: {
    enabled: boolean;
    webhookUrl: string;
    icon_url: string;
    defaultChannel: string;
    defaultErrorChannel: string;
  };
  tmdb: {
    apiKey: string;
  };
  jwt: {
    secret: string;
  };
}

const isProduction = process.env.NODE_ENV === "production";
const serverPort = Number(process.env.SERVER_PORT || 27027);
const serverOrigin = process.env.SERVER_ORIGIN || `http://localhost`;
const serverURL = serverOrigin + (isProduction ? "" : `:${serverPort}`);

const config: IConfig = {
  isProduction,
  server: {
    port: serverPort,
    origin: serverOrigin,
    url: serverURL,
  },
  logger: {
    debugConsole: castStringToBoolean(process.env.DEBUG_CONSOLE),
  },
  slack: {
    enabled: castStringToBoolean(process.env.SLACK_WEBHOOK_URL),
    webhookUrl: process.env.SLACK_WEBHOOK_URL || "",
    icon_url: process.env.SLACK_ICON_URL || "",
    defaultChannel: process.env.SLACK_DEFAULT_CHANNEL || "",
    defaultErrorChannel: process.env.SLACK_DEFAULT_ERROR_CHANNEL || "",
  },
  tmdb: {
    apiKey: process.env.TMDB_API_KEY || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
};

export default config;
