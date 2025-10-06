const userService = require('../services/userAuthService')

const CreateUserController = async (req, res )=>{
    try{
        // const {
        //     first_name,
        //     last_name,
        //     email,
        //     password,
        //     phone_number,
        //     user_type
        //   } = req.body
          
        //   if(!user_type || !email || !phone_number || !first_name || !last_name ){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Input the right credentials "
        //     })
        //   }
          
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
    const {email, password}=req.body 

    if(!email || !password){
      return res.staus(400).json({
        success:false,
        message: "input email and password "
      })
    }
    const existingUser = await userService.loginUser(email, password)

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
