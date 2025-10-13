const prisma= require('../../database/prisma')
const bcrypt =require('bcryptjs')
const tokenService= require('./tokenService')


//create  password reset token [users]
const userPasswordResetToken =async(email)=>{
    try{
    const user = await prisma.users.findUnique({
        where: {email}
    })
    if(!user){
        return{
            staus:404, success:false , message:'If Email Exists , Email wil be sent'
        }
    }
    const token =await tokenService.generateResetToken()
    const expiresAt= new Date(Date.now() + 60*60*1000)

    await prisma.password_reset_tokens.deleteMany({
        where : {user_id: user.user_id}
    })
    await prisma.password_reset_tokens.create({
        data:{
            user_id:user.user_id,
            token:token,
            expires_at: expiresAt
        }
    })

    return{
        staus: 200,
        success:true,
        message:"Password reset link sent",
        token,
        email:user.email

    }
    }catch(error){
        console.error("Error in userPasswordResetToken service")
        return{status:500, success:false, message: "internal server errror"}
    }
}

//verify reset token [users ]
const verifyResetToken= async(token) =>{
    try{
        const resetToken = await prisma.password_reset_tokens.findUnique({
            where:{token},
            include: {users: true}
        })
        if(!resetToken){
            return{
                status:400,
                success:false,
                message: "invalid token"
            };
        }

        if(new Date() >resetToken.expires_at){
            return{
                status:400,
                success:false,
                message: "Token Expired"
            }
        }

        if(resetToken.used_at){
            return{
                status:400,
                success:false,
                message: "Token already used"
            }
        }

        return {
            status:200,
            success:true,
            user:resetToken.users
        }
    }catch(error){
        console.error("Error in verify reset token  service")
        return{status:500, success:false, message: "internal server errror"}
    }
}

//Reset password [users]
const passwordReset=async(token)=>{
try{
    const verification =await verifyResetToken()

    if(!verification){
        return verification
    }

    const user =verification.user
    const password_hash= await bcrypt.hash(newPassword,  10)

    await prisma.users.update({
        where:{user_id:user.user_id},
        data:{password_hash:password_hash}
    })

    await prisma.password_reset_tokens.update({
        where:{token},
        data: {used_at: new Date()}
    })
    return{
        staus:200,
        success:true,
        message: "Password reset successful"
    }
}catch(error){
    console.error("Error in passwordreset service")
    return{status:500, success:false, message: "internal server errror"}
}
}

module.exports={
    userPasswordResetToken,
    verifyResetToken,
    passwordReset
}

