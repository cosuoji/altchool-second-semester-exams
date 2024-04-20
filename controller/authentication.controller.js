import * as authService from "../services/authenticate.services.js"

export let tokenToExport; 

export const login = async (req, res)=>{
    try {
        const { email, password} = req.body;
        const token = await authService.login(email, password)
        tokenToExport = token
        res.json({
            message: "Login successful",
            data: {
            accessToken: token, 
      },
    });
    }
    catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}


export const register = async (req, res)=>{
    try {
    const {first_name, last_name,email, password} = req.body
    const result = await authService.register(first_name, last_name,email, password)
    //console.log(result)
    res.json(result)
    }
    catch(err){
        res.status(err.status || 500);
        res.json({messsage: err.message}) 
    }
}

