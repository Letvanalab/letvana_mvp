const prisma = require('../../database/prisma')

const LandlordDashboard =async(userId , monthsAgo )=>{
    try{
        const landlord = await prisma.users.findUnique({
            where: {user_id: BigInt(userId)},
            select : {
                user_id: true,
                email: true,
                first_name:true,
                last_name: true,
                user_type:true,
                profile_picture_url:true,
                is_verified:true
            }
        })
        if(!landlord){
            return{
                status:404, success:false, message: "User Not Found"}
        }

        const now =new Date();
        const startOfMonth =new Date(now.getUTCFullYear(), now.getMonth(), -monthsAgo, 1);
        const endOfMonth = new Date(now.getUTCFullYear(), now.getMonth(), -monthsAgo +1, 0)

        const revenue= await prisma.rent_payments.aggregate({
            _sum:{
                amount: true
            },
            where: { 
                rental_agreements: { landlord_id: BigInt(userId)},

            created_at:{
                gte: startOfMonth,
                lte: endOfMonth
            },
        }
        })
         const total = revenue._sum.amount || 0


        const propertySummary = await prisma.rental_agreements.findMany({
            where :{ landlord_id : BigInt(userId)},
            select: {
                monthly_rent:true,
                properties:{
                    select:{
                        title:true,
                        address:true,
                        property_type:true,
                    }
                },
                take: 2,
                orderBy : {created_at: 'desc' }
            }
        });

        return{
            status : 200,
            success:true,
            data: {
                landlord:landlord.first_name,
                revenue:total,
                propertySummary: propertySummary
            }
        }
    }catch (error) {
        console.error('Error in LandlordDashboard:', error);
        return {
            status: 500,
            success: false,
            message: 'Internal server error'
        };
    }
}

module.exports={
    LandlordDashboard
}