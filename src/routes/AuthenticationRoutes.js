import { Router } from "express"
import { signIn, signUp } from "../controllers/AuthenticationControllers.js"
import { validateSchema } from "../middlewares/validateSchemaMiddlewares.js"
import { registerUserSchema, signInUserSchema } from "../schemas/AuthenticationSchemas.js"

const authenticationRouter = Router()

authenticationRouter.post("/signup", validateSchema(registerUserSchema), signUp)
authenticationRouter.post("/signin", validateSchema(signInUserSchema), signIn)

export default authenticationRouter