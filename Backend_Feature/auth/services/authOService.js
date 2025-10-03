const { auth } = require('express-openid-connect')
const prisma = require('../../database/prisma')


const syncUserProfile=async(authOUser)=>{
    try{
        const{
            sub, 
            email,
            given_name,
            family_name,
            picture,
            email_verified,
        }= authOUser

        const existingUser= prisma.users.findUnique({
            where :{ email}
        })
        if(existingUser){
            return{
            status:409 , success:false, message:'Admin already exists'
        }
    }
    const user = await prisma.users.create({
        data:{
            user_id:sub,
            email:email,
            first_name:given_name,
            last_name: family_name,
            profile_picture_url: picture,
            is_verified: email_verified,
        }
    })
    return{
        status:201,
        success:true,
        user
    }
    }catch(error){
        console.error("Error in syncProfile service", error)
        return{status:500, success:false, message:"internal server error"}
    }
}

const getProfile =async (authOUser)=>{
    if(!authOUser){
        return{success:false, error: 'Not authenticated' }
    }

    const { email,family_name,given_name} =authOUser

    const user = await prisma.users.findUnique({
    where: { email }
    });

    if(!user){
         return { 
            success: false, 
            error: 'User not found in database' 
        };
    }

    return {
        success: true,
        user
    };

};

module.exports ={
    syncUserProfile,
    getProfile
}