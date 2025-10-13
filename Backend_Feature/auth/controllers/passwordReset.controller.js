const passwordResetService =require('../services/passwordReset.Service')

const UserResetController= async(req, res)=>{
    try{
        const { email } =req.body
        if(!email){
            return res.status(400).json({
                success:false,
                message: 'Email is required'
            })
        }

        const result= await passwordResetService.userPasswordResetToken(email)

        if(result.success && result.token){
            const resetLink = `${result.token}`;

            // console.log(resetLink)
        }

        return res.status(200).json({
            success:true,
            message: "if email exists, reset link will be sent "
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "internal server error"
        })
    }
}

const passwordResetController =async(req, res)=>{
    try{
        const {token, newPassword} =req.body
        if(!token || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Token and new password required"
            })
        }

        if(!newPassword.length < 8){
            return res.status(400).json({
                success:false,
                message: "new password is required"
            })
        }
        const result=await passwordResetService.passwordReset(token, newPassword)

        return{
            success: result.success,
            message:result.message
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "internal server error"
        })
    }
}

module.exports={
    UserResetController,
    passwordResetController
}