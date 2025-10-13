// const { limiter } = require('../middlewares/authenticate');
const bcrypt=require('bcryptjs')
const tokenService=  require ('./tokenService');
const prisma= require('../../database/prisma')


const CreateAdmin=async ({email, password, first_name, last_name, role='super_admin'})=>{
    try{
    const existingUser=await prisma.admin_users.findUnique({
        where: {email}
    });
    if(existingUser){
        return{
            status:409 , success:false, message:'Admin already exists'
        }
    }
    //Password hashing 
    const password_hash = await bcrypt.hash(password, 10)


    const user = await prisma.admin_users.create({
        data: {
            email,
            password_hash,
            first_name,
            last_name,
            role
        }  
    });

    const token =tokenService.generateAccessToken(user.admin_id);

    return{
        status:201,
         success:true, 
        message:'User created successfully', 
        token,
         user :{
            id:user.admin_id,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name,
            role:user.role,
            created_at:user.created_at
        }
    }
}catch(error){
    console.error('Error in CreateUser service', error);
    return{
        status:500,
        success:false,
        message : ' internal server error'
    };
}
}


const LoginAdmin= async({email, password}) =>{
    try{

    const user= await prisma.admin_users.findUnique({
        where :{ email }
    });
    if(!user){
        return{
            status:401, success:false, message:'User Not Found'
        }
    }

    if(!user.is_active){
        return{
            status:401, 
            success: false,
            message:'Account is deactivated'
        };
    }


    const isPasswordValid= await bcrypt.compare(password, user.password_hash);
    if(!isPasswordValid){
        return{
            status: 401, success: false, message: ' Invalid password, please try again.'
        }
    }

    //Last login check
    await prisma.admin_users.update({
        where :{admin_id: user.admin_id},
        data:{last_login_at:new Date() }
    })

    //Token Generation
    const token = tokenService.generateAccessToken(user.admin_id);
    return{status : 200 , success: true , message: 'Login successful', token, user:{
        id: user.admin_id.toString(),
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        last_login_at: user.last_login_at
    }
    };
}catch(error){
    console.error('Error in loginUser service', error)
    return{status:500, 
        success:false ,
        message:"Internal Server Error"
    };
}
};

//Get user by id [Admin]
const getAdminById = async(userId)=>{
    try{
    const user = await prisma.admin_users.findUnique({
        where: {admin_id: BigInt(userId) },
        select :{
            admin_id:true,
            email:true,
            first_name:true,
            last_name:true,
            Permissions:true,
            role:true,
            is_active:true,
            last_login_at:true,
            created_at:true
        }
    });
    if(!user){
        return{
            status:404,
            success:false,
            message:"User Not Found"
        }
    }return{status:200,
        success:true,
        data:user 
    };
    }catch(error){
        console.error('Error in getUserById', error)
        return{status:500,
            success:false,
            message:'Internal Server Error'
        }
    }
}   



module.exports={
    CreateAdmin,
    LoginAdmin,
    getAdminById
}