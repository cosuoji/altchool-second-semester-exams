import mongoose from "mongoose";

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
        requires: true,
    }, 
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
        required: true, 
    },
    tags:{
        type: String,
    },
    body:{
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const User = mongoose.model("User", userSchema)
export default User