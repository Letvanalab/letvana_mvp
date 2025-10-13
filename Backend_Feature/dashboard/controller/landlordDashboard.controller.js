const { response } = require('express')
const dashboardService = require('../service/landlordDashboard.service')


const LandlordDashboardController = async (req, res)=>{
    try{
        const userId = req.user.id
        if(req.user.user_type !== ' landlord'){
            return res.status(403).json({
                success:false,
                message:" Access denied , landlord only"
            })
        }
        const dashboard = await dashboardService.LandlordDashboardController(userId)
        if(!dashboard.success){
            return res.status(dashboard.status).json({
                success:false,
                error: response.message
            });
        } 
        return res.status(dashboard.status).json({
            success:true,
            data: dashboard.data
        })
    } catch (error) {
        console.error('Error in GetLandlordDashboard:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}

module.exports={
    LandlordDashboardController
}