import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import httpErrors from "http-errors";
import axios from "axios";

/// * static
import config from "./config";

/// * routes
import routes from "./routes";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  // Restituisci direttamente gli errori creati con il modulo http-errors
  if (httpErrors.isHttpError(err)) {
    return res.status(err.status).json(err.message);
  }

  if (axios.isAxiosError(err)) {
    const status = err.response?.status || 500;
    const error = err.response?.data || { message: err.message };
    return res.status(status).json(error);
  }

  res.status(500).json(err);
}

const app = express();
app.disable("x-powered-by");

/// * imposta ip dal reverse proxy
app.set("trust proxy", 1);

/// * parsing json del corpo delle richieste
app.use(express.json());

// attiva e configura Cross-Origin Resource Sharing
app.use(
  cors({
    /**
     * In produzione, limita le chiamate dai browser all'URL configurato nel .env, altrimenti impostando a true
     * viene riflessa l'origine del client, di fatto permettendo a tutti di chiamare il server.
     * https://expressjs.com/en/resources/middleware/cors.html#configuration-options
     */
    origin: config.isProduction ? config.server.url.origin : true,
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);

// gestione autenticazione (cookie per risorse cacheabili dal browser)
app.use(cookieParser());

// gestione routers
app.use(config.server.url.pathname.replace(/\/$/, ""), routes);

// infine, gestione errori
//@ts-ignore
app.use(errorHandler);

export default app;
