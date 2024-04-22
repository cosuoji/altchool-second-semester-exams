import jwt from "jsonwebtoken"
import { tokenToUse } from "../controller/authentication.controller.js";

export let emailId, userId;

export const authMiddleware = (req, res, next) =>{

    //console.log(tokenToUse)
    //const authorization = req.headers.authorization || tokenToUse

    const authorization = tokenToUse;
    //console.log(authorization)

    if(!authorization){
        return res.status(401).json({message: "Not Authorized to create or edit blogs"})
    }

    // //const bearerToken = authorization.split(" ")
    // if(bearerToken.length !== 2){
    //     return res.status(401).json({message: "Unauthorized"})
    // }

    const secret = process.env.JWT_SECRET || "secret"
    jwt.verify(authorization, secret, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized"})
        }

        
        req.user = decoded
        //console.log(decoded)
        emailId = decoded.email
        userId = decoded._id
        next();
    })
}




