import { Router } from "express";
import * as blogController from "../controller/blog.controller.js"
import { authMiddleware } from "../middleware/authenticate.middleware.js";


const blogRoute = Router();
blogRoute.get("/", blogController.getAllArticles)
blogRoute.post("/create", authMiddleware, blogController.createArticle)
blogRoute.get("/search", blogController.searchArticles)
blogRoute.get("/:userId",blogController.viewBlogByUserId)
// blogRoute.get("/:userId/draft",blogController.viewDraftByUserId)
// //blogRoute.get("/:userId/published",blogController.viewPublishedyUserId)


export default blogRoute