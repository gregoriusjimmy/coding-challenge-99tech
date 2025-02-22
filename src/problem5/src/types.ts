import { Response, Request } from 'express'

export type TCustomReq<T = null, A = {}> = Request & {
  query: A
  body: T
}

export type TCommonRes<T = any> = Response<{
  data: T
  status: number
  message?: string
}>
