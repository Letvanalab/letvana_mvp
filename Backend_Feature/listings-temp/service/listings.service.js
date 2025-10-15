// const prisma = require('../../database/prisma')
// const cloudinary = require('../../integrations/cloudinary')
// const fs= require('fs')


// // const createProperties =

// const uploadImage= async(propertyId,filePath,userId)=>{
//     try{

//         const response = await cloudinary.uploader.upload(filePath)

//         await prisma.property_media.create({
//             where:{owner_id: userId},
//             data:{
//                 property_id: propertyId,
//                 media_url: response.secure_url,
//                 media_type: 'photo'
//             }
//         })
//     fs.unlink(filePath, ()=>{
//         console.log('file deleted sucessfully')
//     })
//     }
// }