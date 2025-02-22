import { StatusCodes } from 'http-status-codes'
import { TCommonRes, TCustomReq } from '../../../types.js'
import catchAsync from '../../../utils/catchAsync.js'
import prisma from '../../../utils/usePrisma.js'
import type { Resource } from '@prisma/client'
import { TGetResourcesSchema } from '../schema.js'

export const getResources = catchAsync(
  async (req: TCustomReq<null, TGetResourcesSchema>, res: TCommonRes<Resource[]>) => {
    const { name } = req.query

    const resources = await prisma.resource.findMany({
      where: name ? { name: { contains: name, mode: 'insensitive' } } : undefined,
    })

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: resources,
    })
  }
)
