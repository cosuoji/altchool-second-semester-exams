import mongoose, { SchemaType } from "mongoose";
//import User from "./user.schema.js";

const blogArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type:String,
    },
    author:{
        type: String,
        
    },
    authorId:{
        type:String,
    } ,
    state:{
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
    read_count:{
        type: Number,
    },
    reading_time:{
        type: Number,
    },
    tags:{
        type: String,
        default: "",
    },
    body:{
        type: String,
        required: true,
    }
}, {
    timestamps: true
})


const Blogs = mongoose.model("Blogs", blogArticleSchema)
export default Blogs