import { Router } from "express"
import authenticationRouter from "./authenticationRoutes.js"
import urlsRouter from "./urlsRoutes.js"

const router = Router()

router.use(authenticationRouter)
router.use(urlsRouter)

export default router