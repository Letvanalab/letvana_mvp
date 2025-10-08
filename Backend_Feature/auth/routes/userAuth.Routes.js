const express= require('express')
const router= express.Router();

const {authLimiter, resetLimiter,Authenticateuser}= require('../middlewares/auth.middleware')
const ResetController =require('../controllers/passwordReset.controller')
const UserAuthController = require('../controllers/userAuth.controller')
const {validate, passwordSchema, registerSchema, loginSchema,} = require('../middlewares/validator')


router.use(authLimiter, resetLimiter,Authenticateuser )

router.post('/register',validate(passwordSchema),validate(registerSchema),UserAuthController.CreateUserController )
router.post('/login', validate(loginSchema),UserAuthController.LoginUserController)
router.post('/request-reset',ResetController.UserResetController)
router.post('/reset-password',ResetController.passwordResetController)


module.exports=router