import { StatusCodes } from 'http-status-codes'
import { TCommonRes, TCustomReq } from '../../../types.js'
import catchAsync from '../../../utils/catchAsync.js'
import prisma from '../../../utils/usePrisma.js'
import type { Resource } from '@prisma/client'

export const updateResource = catchAsync(async (req: TCustomReq, res: TCommonRes<Resource>) => {
  const { id } = req.params
  const { name, description } = req.body
  const resource = await prisma.resource.update({
    where: { id },
    data: { name, description },
  })

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: resource,
  })
})
