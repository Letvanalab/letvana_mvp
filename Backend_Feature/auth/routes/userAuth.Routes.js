const express= require('express')
const router= express.Router();

const {authLimiter, resetLimiter}= require('../middlewares/auth.middleware')
const ResetController =require('../controllers/passwordReset.controller')
const UserAuthController = require('../controllers/userAuth.controller')
const {validate, passwordSchema, registerSchema, loginSchema} = require('../middlewares/validator')


router.post('/register',authLimiter,validate(registerSchema),UserAuthController.CreateUserController )
router.post('/login',authLimiter, validate(loginSchema),UserAuthController.LoginUserController)
router.post('/request-reset', resetLimiter,ResetController.UserResetController)
router.post('/reset-password',ResetController.passwordResetController)


module.exports=router