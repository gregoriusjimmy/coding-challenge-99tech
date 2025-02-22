import express from 'express'
import validate from '../../middlewares/validate.js'
import { createResourceSchema, getResourcesSchema, updateResourceSchema } from './schema.js'
import { createResource } from './controller/createResource.js'
import { getResources } from './controller/getResources.js'
import { getResourceById } from './controller/getResourceById.js'
import { updateResource } from './controller/updateResource.js'
import { deleteResource } from './controller/deleteResource.js'

const router = express.Router()

router.post('/', validate(createResourceSchema), createResource)
router.get('/', validate(getResourcesSchema), getResources)
router.get('/:id', getResourceById)
router.put('/:id', validate(updateResourceSchema), updateResource)
router.delete('/:id', deleteResource)

export default router
