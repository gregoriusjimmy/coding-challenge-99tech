import express from 'express'
import { resourcesRouter } from './resources/index.js'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/resources',
    route: resourcesRouter,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
