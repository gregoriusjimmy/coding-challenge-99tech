import winston from 'winston'
import config from './config.js'
import { EENV } from '../constants/types.js'

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const logger = winston.createLogger({
  level: config.env === EENV.DEVELOPMENT ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === EENV.DEVELOPMENT ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),

    winston.format.printf(({ level, message }) => {
      if (typeof message === 'object') {
        message = JSON.stringify(message, null, 3)
      }
      return `${level}: ${message}`
    })
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
})

export default logger
