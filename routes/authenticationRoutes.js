import { Router } from "express";
import { generateMiddleware } from "../middleware/generatedMidddleware.js";
import * as authcontroller from "../controller/authentication.controller.js"
import {loginSchema, registerSchema} from "../validations/auth.validations.js"


const authRoute = Router();

authRoute.post("/login", generateMiddleware(loginSchema), authcontroller.login)
authRoute.post("/register", generateMiddleware(registerSchema), authcontroller.register)

export default authRoute