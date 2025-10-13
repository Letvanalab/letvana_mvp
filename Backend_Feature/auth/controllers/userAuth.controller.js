const userService = require('../services/userAuthService')

const CreateUserController = async (req, res )=>{
    try{          
          const newUser = await userService.createUser(req.body)
          
          if(!newUser.success){
            return res.status(newUser.status).json(newUser)
          }
          return res.status(newUser.status).json(newUser)
    }catch(error){
        console.error("Error in userAuth cont", error)
        return res.status(500).json({status:500, success:false, message:"internal server error"})
    }
}

const LoginUserController = async(req, res)=>{
   try{
    const existingUser = await userService.loginUser(req.body)

    if(!existingUser){
      return res.status(existingUser.status).json(existingUser)
    }
    return res.status(existingUser.status).json(existingUser)

   }catch(error){
    console.error('Error in loginUser controller', error)
    return res.status(500).json({success:false, message: "internal server error"})
   }
}
 
module.exports ={
    CreateUserController,
    LoginUserController
}
