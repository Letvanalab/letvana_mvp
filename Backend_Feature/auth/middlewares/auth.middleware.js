const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimiter=require('express-rate-limit');
const joi =require('joi')

//Authentication middleware
const Authenticateuser =async (req, res, next)  =>{
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }           
}


//Rate limiter middleware
const generalLimiter= rateLimiter({
    windowMs: 20 * 60 * 1000, // 20 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    message: {error: 'Too many requests, please try again later.'},
    statusCode: 429 ,
    standardHeaders :true
})

const authLimiter= rateLimiter({
    windowMs : 15*60*1000, //15mins
    limit: 5,
    statusCode: 429,
    message:{error: 'Too many request, please try again'},
    standardHeaders :true
})

const resetLimiter =  rateLimiter({
    windowMs : 30*60*1000,
    limit: 2,
    statusCode: 429,
    message :{error : 'Too many request , please try again'},
      standardHeaders :true
})


module.exports ={
    Authenticateuser,
    PasswordValidator,
    generalLimiter,
    authLimiter,
    resetLimiter,
}
