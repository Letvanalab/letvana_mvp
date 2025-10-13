// const { auth }= require('express-openid-connect')

const config={
   authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENTID  ,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL
}


module.exports={config}