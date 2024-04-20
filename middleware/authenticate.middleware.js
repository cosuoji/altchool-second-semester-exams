import jwt from "jsonwebtoken"

export let emailId;

export const authMiddleware = (req, res, next) =>{
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({message: "Not Authorized to create blogs"})
    }

    const bearerToken = authorization.split(" ")
    if(bearerToken.length !== 2){
        return res.status(401).json({message: "Unauthorized"})
    }

    jwt.verify(bearerToken[1], process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized"})
        }

        emailId = decoded.email
        next();
    })
}



