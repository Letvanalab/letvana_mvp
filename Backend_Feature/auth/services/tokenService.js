const jwt =require('jsonwebtoken');
const crypto = require('crypto')

// Function to generate JWT token
const generateAccessToken = (id) =>{
    const JWT = process.env.JWT_SECRET;

    const safeId=typeof id ==='bigint' ? id.toString() :id;
    
    return jwt.sign({id: safeId}, JWT , {expiresIn:'1h' }
    )
}

const generateResetToken= ()=>{
    return crypto.randomBytes(32).toString('hex')
};




// Function to set token in HTTP-only cookie
const setTokenCookie=(res, token)=>{
 res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60*60*1000,  //1 hour
      secure: process.env.NODE_ENV==='production', 
    });
}


module.exports ={
    generateAccessToken,
    generateResetToken,
    setTokenCookie
}