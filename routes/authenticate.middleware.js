import jwt from "jsonwebtoken"

import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) =>{
    //console.log("Auth Middleware")

    const authorization = req.headers.authorization;

     if(!authorization){
        return res.status(401).json({message: "Not authorized"})
    }

    const bearerToken = authorization.split(" ")
    if(bearerToken.length !== 2){
        return res.status(401).json({message: "Unauthorized"})
    }

    jwt.verify(bearerToken[1], process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized"})
        }
    
        req.user = decoded
         next();

    })

 
}