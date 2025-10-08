const prisma = require("../../database/prisma");

const getUserProfile = async (userId) => {
  try {
    const profile = await prisma.users.findUnique({
      where: { user_id: BigInt(userId) },
      select: {
        user_id: true,
        profile_picture_url: true,
        first_name: true,
        phone_number: true,
      },
    });
    if (!profile) {
      return { status: 404, success: false, message: "user not Found" };
    }
    return {
      status: 200,
      success: true,
      UserProfile: profile,
      message: "Profile Retrieved successfully",
    };
  } catch (error) {
    console.error("Error in user profile service", error);
    return { status: 500, success: false, message: " internal server error" };
  }
};

const updateProfile = async (userId, updatedData) => {
  try {
    // const allowedFields = ['first_name', 'last_name', 'phone_number', 'profile_picture_url']
    // const filteredData ={}

    // for (const field of allowedFields){
    //     filteredData[field] = updatedData[field]
    // }

    const profile = await prisma.users.update({
      where: {
        user_id: BigInt(userId), },
      data: { updatedData },
    });

    return {
      status: 200,
      success: true,
      updatedProfile: profile,
      message: "Profile Updated successfully",
    };
  } catch (error) {
    console.error("Error in updateProfile service", error);
    return { status: 500, success: false, message: "internal server error" };
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
};


// // FOR OF
// const getLoopers= async (id , loopersee) =>{
    
// const allowedLoop = ['looper', 'loopee']
// const filteredLoop ={}

// for (const loops of allowedLoop){
//     if(loopersee !== undefined){
//         filteredLoop[loops] = loopersee[loops]
//     } 
// }

// return{
//     filteredLoop
// }

// }

// // REDUCE
// const getLoopers =async(loopersee)=>{
//     const allowedLoop =['looper', 'loopersee']

//     const filteredLoop = await allowedLoop.reduce((loop, value)=>{
//         if (filteredLoop !== undefined){
//             loop[value] = loopersee[value]
//         }
//         return loop;
//     },  {})
// }