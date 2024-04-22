import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/authenticationRoutes.js";
import blogRoute from "./routes/blogRoute.js";

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || mongodb+srv://test_user:password123456@bookstore.gvhx48w.mongodb.net/?retryWrites=true&w=majority&appName=bookstore
app.use(express.json())


app.use("/", authRoute)
app.use("/blogs", blogRoute)

app.all("*", (req, res)=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})


mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("blogging app is running on PORT", PORT)
        })
    })

