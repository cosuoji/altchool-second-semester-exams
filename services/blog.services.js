import Blogs from "../database/schema/blog.article.schema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import { emailId } from "../middleware/authenticate.middleware.js";
import User from "../database/schema/user.schema.js";




export const getAllArticles = async(page = 1, limit = 20) =>{
    try{
     
        const skip = (page - 1) * limit;
        const filter = {status: "PUBLISHED"}
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




        if(blogEntry){
            throw new ErrorWithStatus("Blog as already been posted", 400)
        }

        //Create New BLog Post 
        const newBlog = new Blogs({title, description, author, reading_time, tags, body});
        await newBlog.save();

        return {
            message: "new blog post",
            data:{
                blog: newBlog
            }
        }
}