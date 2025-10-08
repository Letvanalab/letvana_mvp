const profileService =  require('../service/userProfile.service')

const UserProfileController= async(req, res )=>{
    try{
        const userId= req.user.id
        
        const profile = await profileService.getUserProfile(userId)

        return res.status(profile.status).json({
            success: profile.success,
            response: profile.UserProfile
        })
    }catch(error){
        console.error('Error in profile controller ', error)
        return res.status(500).json({
            success:false,
            message:" internal server error"
        })
    }
}

const UpdateProfileController = async (req, res)=>{
    try{
        const userId = req.user.id
        const updatedData= req.body

        const profileUpdate =await profileService.updateProfile(updatedData, userId)

        return res.status(profileUpdate.status).json({
            success: true,
            response: profileUpdate.updatedProfile
        })
    }catch(error){
        console.error('Error in update profile controller', error)
        return res.status(500).json({
            success:false,
            message: 'internal server error'
        })
    }
}

module.exports= {
    UserProfileController,
    UpdateProfileController
}