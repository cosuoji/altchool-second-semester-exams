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

export const createArticle = async(title, description,tags, body) =>{
      //check if title exists 
       const blogEntry = await Blogs.findOne({title})
       //use the email address of the signed in account to check for first name and last name and pass that to author 
       const name = await User.find({"email":emailId})
       const author = name[0].first_name + " " + name[0].last_name

       //use the author ID to get user ID and bind them together 
       const authorId = userId

       //small algorithm to check for reading time

        let counter = await body.split(" ").length
        let time = Math.ceil((counter / 200))
        const reading_time = time

    


        if(blogEntry){
            throw new ErrorWithStatus("Blog as already been posted", 400)
        }
        //Create New BLog Post 
        const newBlog = new Blogs({title, description, author, authorId, reading_time, tags, body});
        await newBlog.save();

        return {
            message: "new blog post",
            data:{
                blog: newBlog
            }
        }
}

export const searchArticles = async(searchQuery)=>{
    //destructure the search query and check for title
    //let the regex be the search query 
    const {title} = searchQuery;
    let titleRegex = new RegExp(title, "i")

    //destructure the search query and check for title
    //let the regex be the search query 
    const {author} = searchQuery
    let authorRegex = new RegExp(author, "i")
    

    //destructure for tags
    const {tags} = searchQuery
 
    if(title){
    const searchedBlog = await Blogs.find({"title": titleRegex})
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

    if(author){
    const searchedBlog = await Blogs.find({"author": authorRegex})
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

    if(tags){
     //split  the tags from the queryy
     let tagsArray = tags.split(",")

     //create an array, loop through the tag array and trim it 
     let resultsArray = []
     for(let i = 0; i < tagsArray.length; i++){
        tagsArray[i] = tagsArray[i].trim()
     }

     //loop through thee tags array, for each index, create a Regex 
     //then check the database if the tag exists
     //push that to the results array 

     for(let i = 0; i < tagsArray.length; i++){
        let tagsRegex = new RegExp(tagsArray[i], "i")
        let result = await Blogs.find({tags: tagsRegex})
        resultsArray.push(result)
        
      //return the results  
     }

     return {
        message: "Blog Posts Found",
        data:{
            blog: resultsArray
        }
     }

    }

    return{
        message: "Query not found"
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

export const editBlogPost = async(blogId, body) =>{
   
    
    
    const blogPostToEdit = await Blogs.find({_id:blogId})
    if(!blogPostToEdit){
        throw new ErrorWithStatus("Blog Post Not Found", 400)
    }

    if(blogPostToEdit[0].authorId !== userId){
        throw new ErrorWithStatus("You don't have permisson to edit this blog", 400)
    }

    blogPostToEdit[0].body = body
    
    return {
        message: "Changes saved",
        data: {
            body: blogPostToEdit[0].body
        }
    }
}


export const deleteBlogPost = async(blogId, body) =>{
   
    const blogPostToDelete = await Blogs.find({_id:blogId})
    if(!blogPostToDelete){
        throw new ErrorWithStatus("Blog Post Not Found", 400)
    }

    if(blogPostToDelete[0].authorId !== userId){
        throw new ErrorWithStatus("You don't have permisson to delete this blog", 400)
    } else{
        await Blogs.deleteOne({_id:blogId})
    }


    return {
        message: "Blog Deleted",
    }
}