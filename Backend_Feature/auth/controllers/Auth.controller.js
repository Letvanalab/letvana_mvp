// const {PrismaClient}= require('@prisma/client')
const authService= require('../services/authService')

const CreateAdminController = async(req, res)=>{
    try{
        const {email, password, first_name, last_name, role} = req.body;

        const newAdmin= await authService.CreateAdmin({email, password, first_name, last_name, role})
        if(!newAdmin.success){
            return res.status(newAdmin.status).json(newAdmin)
        }
        return res.status(newAdmin.status).json(newAdmin)
    }catch(error){
        console.error('Error in createUser', error)
        return res.status(500).json({status:500, success:false, message:" internal server error"})
    }
}

const LoginAdminController = async(req, res)=>{
    try{
        const {email, password} = req.body

        const existingAdmin = await authService.LoginAdmin({email, password})
        if(!existingAdmin){
            return res.status(existingAdmin.status).json(existingAdmin)
        }
        return res.status(existingAdmin.status).json(existingAdmin)
    }catch(error){
        console.error("Error in loginAdmin cont", error)
        return res.status(500).json({status:500, success:false, message:"internal server error"})
    }
}

module.exports={
    CreateAdminController,
    LoginAdminController,
}














// const CreateUser= async (req, res) =>{
//     try{
//         const payload = req.body;
//         const response = await authService.CreateUser(payload);

//         if(!response.success){{
//             return res.status(response.status)
//             .json({success :false, error: response.message});
//         }}
//         return res.status(response.status).json({success:true, message:response.message, token:response.token});
//     }catch(error){
//         console.error('Error in creating user:', error);
//         return res.status(500).json({success:false, error:'Internal server error'});
//     }
// }


// const LoginUser= async (req, res) =>{
//     try{
//         const response= await authService.LoginUser(req.body);
//         if(!response.success){
//             return res.status(response.status)
//             .json({success:false, error: response.message});
//         }
//         setTokenCookie(res, response.token);
//         return res.status(response.status).json({success:true, message:response.message, token:response.token});
//     }catch(error){
//         console.error('Error in your logging session , please try again:', error);
//         return res.status(500).json({success:false, error:'Internal server error'});
//     }
// }


