const { user_type_enum } = require('@prisma/client')
const prisma = require('../../database/prisma')
const tokenService =require('../services/tokenService')
const bcrypt =require('bcryptjs')

const createUser =async({
    first_name,
    last_name,
    email,
    password,
    phone_number,
    user_type,
})=>{
    try{
        const validTypes = user_type_enum
        if(!validTypes.includes(user_type)){
            return{
                status: 400,
                success: false,
                message: "invalid user type , Must be: tenant or landlord "
            }
        }

    const existingUser= await prisma.users.findUnique({
        where : {email}
    })
    if(existingUser){
        return {status:409 , success: false, message: "Admin already Exists"}
    }

        const password_hash = await bcrypt.hash(password, 10)

        const newUser= await prisma.users.create({
            data: {
                email,
                password_hash,
                first_name,
                last_name,
                phone_number,
                user_type
            }
        })

        const token =tokenService.generateAccessToken(newUser.user_id)

        return{
            status:201,
            success:true,
            token,
            message: "user created successfully",
            user:{
                email:newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                phone_number: newUser.phone_number,
                user_type : newUser.user_type,
                created_at: newUser.created_at
            }
        }
    }catch(error){
        console.error('Error in createUser' , error)
        return {status: 500, success:false ,message : "internal server error"}
    }
}

const loginUser =async({
    email,
    password
})=>{
    try{
         const user = await prisma.users.findUnique({
            where : { email }
         })
         if(!user){
            return {
                status: 401, success:false, message: "User Not found "
            }
         }
         
         if(!user.is_active){
            return{
                status: 401, success: false, message: "Account is deactivated"
            }
         }

            const isPasswordValid = await bcrypt.compare(password, user.password_hash)
            if(!isPasswordValid){
                return{
                    status:401, success:false, message: "invalid password , please try again "
                }
            }
            //update last login date 
            await prisma.users.update({
                where:{user_id: user.user_id},
                data:{last_login_at: new Date() }
            })

            const token = tokenService.generateAccessToken(user.user_id);

            return {status: 200, success:true, message : "Login Succesful", token, user:{
                id: user.user_id.toString(),
                email: user.email,
                first_name: user.first_name,
                last_name:user.last_name,
                role: user.user_type,
                last_login_at: user.last_login_at
            }}
    }catch(error){
        console.error('Error in login user service', error)
        return{status: 500, success:false, message: " internal server error"}
    }
}



module.exports ={
     createUser,
     loginUser
}



