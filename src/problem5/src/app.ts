import express from 'express'
import morgan from './configs/morgan.js'
import { errorConverter, errorHandler } from './middlewares/error.js'
import cors from 'cors'
import ApiError from './utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'
import routes from './domain/index.js'

// Initialize Express app
const app = express()
app.use(morgan.successHandler)
app.use(morgan.errorHandler)
app.use(express.json({ limit: '50mb' }))
// parse urlencoded request body
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// enable cors
app.use(cors())
app.options('*', cors())

app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'))
})

app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
