const express =require('express')
const authOMiddleware= require('../middlewares/authO.middleware')
const authOController=require('../controllers/authO.controller')

const router=express.Router()

router.use(authOMiddleware.authOMiddleware)

router.get('/profile', authOController.GetProfileController, authOMiddleware.requireAuth0)
router.get('/callback',authOController.HandleCallbackController)
router.get('/test-login', authOController.TestLogin)

module.exports=router