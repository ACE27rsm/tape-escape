process.env.IS_PROCESSOR = 'true'
import config from './config'
import http from 'http'

/// * classes
import Logger from './libs/Logger'
// import SocketServer from './socketServer'

const port = config.server.port
const logger = new Logger('index')
/**
 * Create HTTP server.
 */
const server = http.createServer()

/**
 * Setup Socket.io
 */
// SocketServer.init(server)

Promise.resolve().then(async () => {
  server.listen(port)
  server.on('error', unexpectedErrorHandler)
  server.on('listening', serverListeningHandler)
})

process.on('unhandledRejection', unexpectedErrorHandler)

function serverListeningHandler() {
  logger.log({ message: 'HelloPack Processor app listening on port ' + port })
}

/**
 * Error handler for unhandled exceptions and promise rejections.
 */
function unexpectedErrorHandler(error: Error) {
  logger.error({ error })
  if (server) {
    server.close(() => {
      logger.error({ error: new Error('Server closed'), slack: true })
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}
