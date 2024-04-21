import Blogs from "../database/schema/blog.article.schema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import { emailId, userId } from "../middleware/authenticate.middleware.js";
import User from "../database/schema/user.schema.js";



export const getAllArticles = async(page = 1, limit = 20) =>{
    try{
        const skip = (page - 1) * limit;
        const filter = {state: "PUBLISHED"}
        const total = await Blogs.countDocuments(filter);
       
        const blogs = await Blogs.find(filter).skip(skip).limit(limit)
       
        return { data: blogs, meta: {page, limit, total}}
    }
    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}

export const createArticle = async(title, description, reading_time, tags, body) =>{
       const blogEntry = await Blogs.findOne({title})
       const name = await User.find({"email":emailId})
       const author = name[0].first_name + " " + name[0].last_name
       const authorId = userId
        if(blogEntry){
            throw new ErrorWithStatus("Blog as already been posted", 400)
        }
        //Create New BLog Post 
        const newBlog = new Blogs({title, description, author, authorId,reading_time, tags, body});
        await newBlog.save();

        return {
            message: "new blog post",
            data:{
                blog: newBlog
            }
        }
}

export const searchArticles = async(titleToSearch)=>{
    const searchedBlog = await Blogs.find({"title":titleToSearch})
    if(!searchedBlog){
        throw new ErrorWithStatus("Blog Post not found", 400)
    }

    if(searchedBlog.length < 1){
         throw new ErrorWithStatus("Blog Post not found", 400)
    }
    return {
            message: "Blog post found",
            data:{
                blog: searchedBlog
            }
        }
}


export const viewBlogByUserId = async(userId,stateKey,page = 1, limit = 20) =>{
    //check if user exists
    const userIdChecker = !Blogs.find({"authorId": userId}) 

    //check if there is a query and if the user exists

    if(stateKey === undefined && !userIdChecker){
        
    let filter = {authorId: userId}
    let total = await Blogs.countDocuments(filter);
    const userBlogPosts = await Blogs.find({"authorId":userId}).limit(limit)

    if(userBlogPosts.length < 1){
        return {
            message: "User has no posts"
        }
    }
    return{
        message: "Found these Posts",
        data:{
            blogs: userBlogPosts
        }, 
        meta: {page, limit, total}
    }
    }

    //If the request is draft, return all the draft posts from the user
    if(stateKey.toUpperCase() === "DRAFT" && !userIdChecker){
        let filter = {"authorId":userId, state:"DRAFT"}
        let total = await Blogs.countDocuments(filter);
        let result = await Blogs.find(filter).limit(limit)
        return {
        message: "Found these Posts",
            data:{
                blogs: result,
            }, 
            meta: {page, limit, total}
        }
    }

 //If the request is published, return all the published posts from the user
    if(stateKey.toUpperCase() === "PUBLISHED" && !userIdChecker){
        let filter = {"authorId":userId, state:"PUBLISHED"}
        let total = await Blogs.countDocuments(filter);
        let result = await Blogs.find(filter).limit(limit)
        return {
        message: "Published",
            data:{
                blogs: result,
            }, 
            meta: {page, limit, total}
        }
    }

}