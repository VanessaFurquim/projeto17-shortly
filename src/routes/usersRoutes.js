import { Router } from "express"
import { validateAuthentication } from "../middlewares/validateAuthentication.js"
import { getUserData } from "../controllers/usersControllers.js"

const userRouter = Router()

userRouter.get("/users/me", validateAuthentication, getUserData)


export default userRouter