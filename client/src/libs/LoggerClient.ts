import createDebug, { Debugger } from "debug";
import axios from "axios";

/// * static
import config from "../config";

class Logger {
  /// y ***********************************
  private debugPrefix = "tape-escape:client:";
  private debugInstance: null | Debugger = null;
  private debugInstanceError: null | Debugger = null;
  private consoleColor: string | undefined;
  private consoleBackground: string | undefined;

  /// b ***********************************
  constructor(
    private readonly debuggerNamespace: string,
    style?: { color?: string; background?: string }
  ) {
    this.debugInstance = createDebug(
      `${this.debugPrefix}log:${debuggerNamespace}`
    );
    this.debugInstanceError = createDebug(
      `${this.debugPrefix}error:${debuggerNamespace}`
    );
    this.consoleColor = style?.color;
    this.consoleBackground = style?.background;
  }

  /// o ***********************************
  private getStyle(): string {
    let style = "";
    if (this.consoleColor) {
      style += `color: ${this.consoleColor};`;
    }
    if (this.consoleBackground) {
      style += `background: ${this.consoleBackground};`;
    }

    return style;
  }

  private getStyledConsolePayload() {
    const style = this.getStyle();
    return style
      ? [`%c ${this.debuggerNamespace} `, style]
      : [` ${this.debuggerNamespace} `];
  }

  /// ! ***********************************
  public error(payload: {
    error: Error | any;
    functionName?: string;
    data?: any[];
  }): void {
    let errorMessage = payload.functionName ? `${payload.functionName}: ` : "";
    let errorPayload: Error | Object | undefined;

    if (axios.isAxiosError(payload.error)) {
      errorMessage +=
        payload.error.response?.data?.message || payload.error.message;
      errorPayload = payload.error.toJSON();
    } else {
      errorMessage += payload.error.message;
      errorPayload = payload.error;
    }

    if (payload.data) {
      let data = payload.data;

      if (!Array.isArray(data)) {
        data = [data];
      }

      this.debugInstanceError!(errorMessage, errorPayload, ...data);
    } else {
      this.debugInstanceError!(errorMessage, errorPayload);
    }
  }

  /// g ***********************************
  public async log(payload: {
    message: string;
    data?: any[];
    functionName?: string;
  }): Promise<void> {
    const message = payload.functionName
      ? `${payload.functionName}: ${payload.message}`
      : payload.message;

    if (payload.data) {
      let data = payload.data;

      if (!Array.isArray(data)) {
        data = [data];
      }

      this.debugInstance!(message, ...data);
    } else {
      this.debugInstance!(message);
    }
  }

  /// g ***********************************
  public debug(...payload: any[]): void {
    if (
      !config.logger.debugConsole &&
      !window.localStorage.getItem("hp-debug")
    ) {
      return;
    }

    console.log(...this.getStyledConsolePayload(), ...payload);
  }

  /// g ***********************************
  public debugError(...payload: any[]): void {
    if (
      !config.logger.debugConsole &&
      !window.localStorage.getItem("hp-debug")
    ) {
      return;
    }

    console.error(...this.getStyledConsolePayload(), ...payload);
  }
}

export default Logger;
