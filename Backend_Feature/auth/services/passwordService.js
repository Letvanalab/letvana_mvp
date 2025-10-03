const { auth }= require('express-openid-connect')

const config={
   authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID:AUTH_CLIENT_URL,
  issuerBaseURL:AUTH_ISSUER_BASE_URL
}

module.exports=auth(config)


