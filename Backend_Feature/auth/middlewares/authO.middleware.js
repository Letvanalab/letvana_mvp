const {auth}= require('express-openid-connect')
const {config} = require('../config/authConfig')
const dotenv=require('dotenv')

dotenv.config();

const authOMiddleware = auth(config)

const requireAuth0 = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required'
        });
    }
    next();
};

module.exports= {
    requireAuth0,
    authOMiddleware
}

