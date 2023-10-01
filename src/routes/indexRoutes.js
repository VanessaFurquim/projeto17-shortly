import { Router } from "express"
import authenticationRouter from "./authenticationRoutes.js"
import urlsRouter from "./urlsRoutes.js"
import userRouter from "./usersRoutes.js"

const router = Router()

router.use(authenticationRouter)
router.use(urlsRouter)
router.use(userRouter)

export default router