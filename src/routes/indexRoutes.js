import { Router } from "express"
import authenticationRouter from "./AuthenticationRoutes.js"

const router = Router()

router.use(authenticationRouter)

export default router