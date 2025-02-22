import { AnyZodObject, ZodError } from 'zod'
import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'

const validate =
  (schema: { body?: AnyZodObject; query?: AnyZodObject; params?: AnyZodObject }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body)
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query)
      }
      if (schema.params) {
        req.params = schema.params.parse(req.params)
      }
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessage = err.errors.map((e) => `${e.path.join('.')} - ${e.code} ${e.message} ${e.path}`).join(', ')
        return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
      }
      next(err)
    }
  }

export default validate
