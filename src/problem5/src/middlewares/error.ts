import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError.js'

import { StatusCodes } from 'http-status-codes'
import logger from '../configs/logger.js'
import config from '../configs/config.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const errorConverter = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error instanceof PrismaClientKnownRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
    const message = error.message || StatusCodes[statusCode].toString()
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err
  if (config.env === 'production' && !err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    message = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR].toString()
  }

  res.locals.errorMessage = err.message
  const response = {
    code: statusCode,
    message,
    ok: false,
    ...(config.env === 'development' && { stack: err.stack }),
  }

  if (config.env === 'development') {
    logger.error(err)
  }
  res.status(statusCode).json({ ...response })
}

export { errorConverter, errorHandler }
