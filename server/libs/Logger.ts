import createDebug, { Debugger } from 'debug'
import axios from 'axios'
import _ from 'lodash'

/// * classes
import Slack from '../libs/Slack'

/// * static
import config from '../config'

/// * types
export enum EConsoleModifierName {
  Reset = '\x1b[0m',
  Bright = '\x1b[1m',
  Dim = '\x1b[2m',
  Underscore = '\x1b[4m',
  Blink = '\x1b[5m',
  Reverse = '\x1b[7m',
  Hidden = '\x1b[8m',
}
export enum EConsoleBackgroundName {
  Black = '\x1b[40m',
  Red = '\x1b[41m',
  Green = '\x1b[42m',
  Yellow = '\x1b[43m',
  Blue = '\x1b[44m',
  Magenta = '\x1b[45m',
  Cyan = '\x1b[46m',
  White = '\x1b[47m',
  Gray = '\x1b[100m',
}
export enum EConsoleColorName {
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  Gray = '\x1b[90m',
}
interface ILoggerOptions {
  console?: {
    style?: {
      color?: EConsoleColorName
      background?: EConsoleBackgroundName
      modifier?: EConsoleModifierName
    }
    showDateTime?: boolean
  }
}

class Logger {
  /// y ***********************************
  private debugPrefix = 'server:'
  private debugInstance: null | Debugger = null
  private debugInstanceError: null | Debugger = null

  private slackChannel = config.slack.defaultChannel
  private slackErrorChannel = config.slack.defaultErrorChannel
  private slackText = 'Test'

  private consoleColorMethod: null | Function = null

  private options: ILoggerOptions = {
    console: {
      style: undefined,
      showDateTime: false,
    },
  }

  /// b ***********************************
  constructor(
    private readonly debuggerNamespace: string,
    options?: ILoggerOptions
  ) {
    this.options = { ...this.options, ...options }

    this.debugInstance = createDebug(
      `${this.debugPrefix}log:${debuggerNamespace}`
    )
    this.debugInstanceError = createDebug(
      `${this.debugPrefix}error:${debuggerNamespace}`
    )
  }

  /// ! ***********************************
  public error(payload: {
    error: Error | any
    slack?: boolean
    functionName?: string
    data?: any[]
  }): void {
    let errorMessage = payload.functionName ? `${payload.functionName}: ` : ''
    let errorPayload: Error | Object | undefined

    if (axios.isAxiosError(payload.error)) {
      errorMessage +=
        payload.error.response?.data?.message || payload.error.message
      errorPayload = payload.error.toJSON()
    } else {
      errorMessage += payload.error.message
      errorPayload = payload.error
    }

    if (payload.data) {
      this.debugInstanceError!(errorMessage, errorPayload, ...payload.data)
    } else {
      this.debugInstanceError!(errorMessage, errorPayload)
    }

    if (config.slack.enabled && payload.slack) {
      const title = `${this.debuggerNamespace}${
        payload.functionName ? `:${payload.functionName}` : ''
      }`

      Slack.sendNotification({
        text: this.slackText,
        channel: this.slackErrorChannel,
        icon_url: config.slack.icon_url,
        attachments: [
          {
            fallback: title,
            color: 'danger',
            fields: [
              {
                title,
                value: errorMessage,
                short: false,
              },
            ],
          },
        ],
      })
    }
  }

  /// g ***********************************
  public async log(payload: {
    message: string
    slack?: boolean
    data?: any[]
    functionName?: string
  }): Promise<void> {
    const message = payload.functionName
      ? `${payload.functionName}: ${payload.message}`
      : payload.message

    if (payload.data) {
      this.debugInstance!(message, ...payload.data)
    } else {
      this.debugInstance!(message)
    }

    if (config.slack.enabled && payload.slack) {
      const title = `${this.debuggerNamespace}${
        payload.functionName ? `:${payload.functionName}` : ''
      }`

      Slack.sendNotification({
        text: this.slackText,
        channel: this.slackChannel,
        icon_url: config.slack.icon_url,
        attachments: [
          {
            fallback: title,
            color: '#5BBEED',
            fields: [
              {
                title,
                value: payload.message,
                short: false,
              },
            ],
          },
        ],
      })
    }
  }

  /// g ***********************************
  public debug(...payload: any[]): void {
    if (!config.logger.debugConsole) {
      return
    }

    let data = []
    if (this.options.console?.style) {
      if (this.options.console.style.color) {
        data.push(this.options.console.style.color)
      }
      if (this.options.console.style.background) {
        data.push(this.options.console.style.background)
      }
      if (this.options.console.style.modifier) {
        data.push(this.options.console.style.modifier)
      }
    }
    data.push(this.debuggerNamespace)
    if (this.options.console?.showDateTime) {
      data.push(new Date().toISOString())
    }
    data.push(...payload)

    if (this.options.console?.style) {
      data.push(EConsoleModifierName.Reset)
    }

    if (this.consoleColorMethod) {
      console.log(this.consoleColorMethod(...data))
    } else {
      console.log(...data)
    }
  }

  /// g ***********************************
  public debugError(...payload: any[]): void {
    if (!config.logger.debugConsole) {
      return
    }
    let data = []
    data.push(EConsoleBackgroundName.Red)
    data.push(EConsoleColorName.White)
    data = [this.debuggerNamespace]
    if (this.options.console?.showDateTime) {
      data.push(new Date().toISOString())
    }
    data.push(...payload)
    data.push(EConsoleModifierName.Reset)

    console.log()
  }
}

export default Logger
