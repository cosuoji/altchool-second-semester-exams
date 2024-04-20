import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type: String, 
        requires: true,
    }
}, {
    timestamps: true
})


const User = mongoose.model("User", userSchema)
export default User