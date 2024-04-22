//make sure to state that the blog must be published, can't fetch blogs in draft state 
import * as blogService from "../services/blog.services.js"


export const getAllArticles = async(req, res) =>{
    try{
        const orderRequest = req.query
        const blogs = await blogService.getAllArticles(orderRequest)
        res.json({message: "Get all published posts", data: blogs})
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

export const createArticle = async(req, res) =>{
    try{
        const {title, description, tags, body} = req.body;
        const result = await blogService.createArticle(title, description,tags, body);
        //console.log(result)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const searchArticles = async(req, res)=>{
    try{
        const searchQuery = req.query;
        const result = await blogService.searchArticles(searchQuery)
        res.json(result)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const viewBlogByUserId = async (req, res) =>{
    try{
        const userId = req.params.userId;
        const stateKey = Object.keys(req.query)[0]
        const result = await blogService.viewBlogByUserId(userId, stateKey)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const editBlogPost = async(req, res) =>{
    try{ 
        const blogId = req.params.blogId
        const {body} = req.body
        const result = await blogService.editBlogPost(blogId, body)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const deleteBlogPost = async(req, res) =>{
    try{
        const blogId = req.params.blogId
        const result = await blogService.deleteBlogPost(blogId)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


export const displayBlogStats = async(req, res) =>{
    try{
        const blogId  = req.params.blogId
        const result = await blogService.displayBlogStats(blogId)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}