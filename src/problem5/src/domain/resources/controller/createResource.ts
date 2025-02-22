import { StatusCodes } from 'http-status-codes'
import { TCustomReq, TCommonRes } from '../../../types.js'
import catchAsync from '../../../utils/catchAsync.js'
import prisma from '../../../utils/usePrisma.js'
import type { Resource } from '@prisma/client'

export const createResource = catchAsync(async (req: TCustomReq, res: TCommonRes<Resource>) => {
  const { name, description } = req.body
  const resource = await prisma.resource.create({
    data: { name, description },
  })

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    data: resource,
  })
})
