import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "../routes/authenticationRoutes.js";
import blogRoute from "../routes/blogRoute.js";

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI 
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

