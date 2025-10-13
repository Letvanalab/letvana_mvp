const prisma = require('../../database/prisma')

const LandlordDashboard =async(userId  )=>{
    try{
        const now =new Date();
        const startOfMonth =new Date(now.getUTCFullYear(), now.getMonth(),1 );
        const endOfMonth = new Date(now.getUTCFullYear(), now.getMonth(), +1, 0)

        const landlordId =BigInt(userId)

        const [landlord, revenue,propertySummary, recentActivity ]= await Promise.all ([
    
            //landlord 
        prisma.users.findUnique({
            where: {user_id: landlordId},
            select : {
                user_id: true,
                email: true,
                first_name:true,
                last_name: true,
                user_type:true,
                profile_picture_url:true,
                is_verified:true
            }
        }),


        //monthly revenue
          prisma.rent_payments.aggregate({
            where: { 
                rental_agreements: { 
                    landlord_id: landlordId,
                },

            payment_date:{
                gte: startOfMonth,
                lte: endOfMonth,
            },
            payment_status: 'completed'
        },
         _sum:{
             amount: true
            },
        }),
          

        //property summary
         prisma.rental_agreements.findMany({
            where :{
                 landlord_id : landlordId,
                status:'active',
            },
            select: {
                agreement_id:true,
                property_id:true,
                monthly_rent:true,
                properties:{
                    select:{
                        title:true,
                        address:true,
                        property_type:true,
                    }
                },
                status:true,
            },
            take: 2,
            orderBy : {created_at: 'desc' }
        }),

        //Recent Activity 
         prisma.rental_agreements.findMany({
            where: {landlord_id:landlordId},
            select:{
                agreement_id:true,
                properties:{
                    select:{
                        address:true,
                        title:true
                    }
                },
                rent_payments:{
                    select:{
                        amount: true,
                        payment_date: true,
                    },
                    take:1,
                    orderBy: {payment_date: 'desc'}
                },
            },
            take: 5,
            orderBy: {created_at: 'desc'}
        })
        ])

        const formattedActivity= recentActivity.map(activity =>{
            const payment =activity.rent_payments[0]
            const properties= activity.properties;

            return{
            agreement_id: activity.agreement_id,
            address: activity.properties?.address,
            payment_date:payment?.payment_date,
            amount:payment?.amount,
            properties_date:properties?.title,
            description:payment?`Received payment of ${payment.amount} for ${properties.title}, at ${properties.address}, on ${payment.payment_date}`: 'No payments yet'
        }
        })


        const landlordName =landlord?.first_name

        const totalRevenue =revenue._sum?.amount

        const formattedPropertySummary =propertySummary.map(prop=>({
            agreement_id: prop.agreement_id,
            monthly_rent:prop.monthly_rent,
            property_id:prop.property_id,
            title: prop.properties?.title,
            address:prop.properties?.address,
            property_type: prop.properties?.property_type,
        }))
     
        return{
            status : 200,
            success:true,
            data: {
                landlord:landlordName,
                revenue:totalRevenue,
                propertySummary: formattedPropertySummary,
                recentActivity:formattedActivity
            }
        }
    }catch (error) {
        console.error('Error in LandlordDashboardService :', error);
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