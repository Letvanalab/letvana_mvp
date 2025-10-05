const express= require('express')
const router= express.Router();

const AuthMiddleware= require('../middlewares/authenticate')
const ResetController =require('../controllers/passwordReset.controller')


router.use(AuthMiddleware.limiter)

router.post('/request-reset',ResetController.UserResetController)
router.post('/reset-password',ResetController.passwordResetController)


module.exports=router