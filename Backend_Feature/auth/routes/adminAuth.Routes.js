const express= require('express')
const router= express.Router();

const AuthController= require('../controllers/adminAuth.controller')
const {authLimiter }= require('../middlewares/auth.middleware')
// const ResetMiddleware= require('../middlewares/passwordReset')

router.use(authLimiter, resetLimiter)

router.post('/admin/register', AuthMiddleware.Authenticateuser, AuthController.CreateAdminController,)
router.post('/admin/login' ,AuthController.LoginAdminController),



module.exports= router