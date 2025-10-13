// const AuthOService = require("../services/authOService");

// const GetProfileController = async (req, res) => {
//   try {
//     if (!req.oidc.isAuthenticated()) {
//       return {
//         success: false,
//         error: "Not authenticated",
//       };
//     }
//     const authOUser = req.oidc.user;
//     const profile = await AuthOService.getProfile(authOUser);

//     if (profile.success) {
//       return res.status(401).json({
//         success: false,
//         error: result.error,
//       });
//     }
//     return res.status(200).json(profile);
//   }catch(error) {
//     console.error("Error in GetProfile:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// };

// // Callback handling
// const HandleCallbackController = async (req, res) => {
//   try {
//     const authOUser = req.oidc.user;
//     if(!req.oidc.isAuthenticated()){
//       return res.redirect('/?error=auth_failed')
//     } 

//     const syncedUser = await AuthOService.syncUserProfile(authOUser);
//     if (!syncedUser.success) {
//       return res.redirect("/?error=sync_failed");
//     }

//     return res.redirect("/");
//   } catch (error) {
//     console.error("Error in handle callback", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error"});
//   }
// };

// const TestLogin= async (req, res)=>{
//   try{
//     const authOUser = req.oidc.user
//     res.send(`
//        <!DOCTYPE html>
//         <html>
//         <head>
//             <title>Test Auth0</title>
//         </head>
//         <body>
//             <h1>Auth0 Test Page</h1>
//             <p>Hey ${authOUser.name} , welcome to letvana</p>
//             ${req.oidc.isAuthenticated() 
//                 ? `
//                     <p>Logged in as: ${authOUser.email}</p>
//                     <a href="/api/v1/auth/logout">Logout</a>
//                 `
//                 : `
//                     <a href="/login">Login with Auth0</a>
//                 `
//             }
//       `)
//   }catch(error){
//     console.error('Error in testLogin cont', error)
//      return res
//       .status(500)
//       .json({ success: false, error: "Internal server error"});
//   }
// }

// module.exports = {
//   GetProfileController,
//   HandleCallbackController,
//   TestLogin
// };
