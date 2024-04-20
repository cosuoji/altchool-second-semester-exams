import { Router } from "express";
import * as blogController from "../controller/blog.controller.js"
import { authMiddleware } from "./authenticate.middleware.js";


const blogRoute = Router();
blogRoute.get("/", authMiddleware, blogController.getAllArticles)


export default blogRoute