const {auth}= require('express-openid-connect')
const authConfig = require('../config/authConfig')

const authOMiddleware = auth(authConfig)

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

