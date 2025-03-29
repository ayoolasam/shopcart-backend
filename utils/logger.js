const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // Log only if info level or higher
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Logs to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs errors to a file
    new transports.File({ filename: 'logs/combined.log' }) // Logs all messages to a file
  ]
});

module.exports = logger;