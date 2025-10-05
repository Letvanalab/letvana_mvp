const express= require('express')
const router= express.Router();

const AuthController= require('../controllers/Auth.controller')
const AuthMiddleware= require('../middlewares/authenticate')
// const ResetMiddleware= require('../middlewares/passwordReset')


router.use(AuthMiddleware.limiter)

router.post('/register', AuthMiddleware.Authenticateuser, AuthController.CreateAdminController,)
router.post('/login' ,AuthController.LoginAdminController),

module.exports= router