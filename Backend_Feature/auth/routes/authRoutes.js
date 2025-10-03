const express= require('express')
const router= express.Router();

const AuthController= require('../controllers/Auth.controller')
const AuthMiddleware= require('../middlewares/authenticate')
const ResetMiddleware= require('../middlewares/passwordReset')

router.post('/admin/register', AuthController.CreateAdminController,)
router.post('/admin/login' ,AuthController.LoginAdminController),

module.exports= router