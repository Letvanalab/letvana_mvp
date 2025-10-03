const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimiter=require('express-rate-limit');

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
const limiter= rateLimiter({
    windowsMs: 20 * 60 * 1000, // 20 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    message: {error: 'Too many requests, please try again later.'},
    status: 429 ,
    ipv6Subnet: 56 , 
    // skip :(req , res) =>false
})




module.exports ={
    Authenticateuser,
    limiter
}
