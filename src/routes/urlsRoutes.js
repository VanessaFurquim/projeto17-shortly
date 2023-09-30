import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchemaMiddlewares.js"
import { validateAuthentication } from "../middlewares/validateAuthentication.js"
import { urlSchema } from "../schemas/urlSchema.js"
import { getUrlById, shorteningUrl } from "../controllers/urlsControllers.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateAuthentication, validateSchema(urlSchema), shorteningUrl)
urlsRouter.get("/urls/:id", getUrlById)
// urlsRouter.get("/urls/open/:shortUrl", signIn)
// urlsRouter.delete("/urls/:id", validateAuthentication, signIn)

export default urlsRouter