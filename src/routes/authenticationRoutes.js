import { Router } from "express"
import { signUp, signIn } from "../controllers/authenticationControllers.js"
import { validateSchema } from "../middlewares/validateSchemaMiddlewares.js"
import { registerUserSchema, signInUserSchema } from "../schemas/authenticationSchemas.js"

const authenticationRouter = Router()

authenticationRouter.post("/signup", validateSchema(registerUserSchema), signUp)
authenticationRouter.post("/signin", validateSchema(signInUserSchema), signIn)

export default authenticationRouter