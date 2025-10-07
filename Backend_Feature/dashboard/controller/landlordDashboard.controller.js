const { response } = require('express')
const dashboardService = require('../service')

const LandlordDashboardController = async (req, res)=>{
    try{
        const userId = req.user.id
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