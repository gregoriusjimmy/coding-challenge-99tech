import { StatusCodes } from 'http-status-codes'
import { TCommonRes, TCustomReq } from '../../../types.js'
import catchAsync from '../../../utils/catchAsync.js'
import prisma from '../../../utils/usePrisma.js'
import type { Resource } from '@prisma/client'

export const getResourceById = catchAsync(async (req: TCustomReq, res: TCommonRes<Resource | null>) => {
  const { id } = req.params
  const resource = await prisma.resource.findUnique({ where: { id } })

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: resource,
  })
})
