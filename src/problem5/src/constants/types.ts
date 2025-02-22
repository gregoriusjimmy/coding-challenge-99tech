export enum EENV {
  'DEVELOPMENT' = 'development',
  'PRODUCTION' = 'production',
}

export type TCommonRequest<T> = Request & {
  body: T
}
