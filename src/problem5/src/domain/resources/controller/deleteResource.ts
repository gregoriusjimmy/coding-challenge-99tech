import { StatusCodes } from 'http-status-codes'
import { TCommonRes, TCustomReq } from '../../../types.js'
import catchAsync from '../../../utils/catchAsync.js'
import prisma from '../../../utils/usePrisma.js'
import type { Resource } from '@prisma/client'

export const deleteResource = catchAsync(async (req: TCustomReq, res: TCommonRes<null>) => {
  const { id } = req.params
  await prisma.resource.delete({ where: { id } })

  res.status(StatusCodes.NO_CONTENT).json({
    status: StatusCodes.NO_CONTENT,
    data: null,
  })
})
