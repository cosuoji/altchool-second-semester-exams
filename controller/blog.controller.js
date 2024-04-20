//make sure to state that the blog must be published, can't fetch blogs in draft state 
import * as blogService from "../services/blog.services.js"

export let titleToSearch;

export const getAllArticles = async(req, res) =>{
    try{
       
        const blogs = await blogService.getAllArticles()
        res.json({message: "Get all published posts", data: blogs})
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

export const createArticle = async(req, res) =>{
    try{
        const {title, description, reading_time, tags, body} = req.body;
        const result = await blogService.createArticle(title, description,reading_time, tags, body);
        //console.log(result)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const searchArticles = async(req, res)=>{
    try{
        const {title} = req.query;
        titleToSearch = title
        const result = await blogService.searchArticles(title)
        res.json(result)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

//export const searchUserArticles