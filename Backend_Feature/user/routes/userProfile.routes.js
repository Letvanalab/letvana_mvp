const express = require('express')
const router= express.Router();

const {Authenticateuser}= require('../../auth/middlewares/auth.middleware')
const UserProfileController =require('../controller/userProfile.controller')
const {validate, passwordSchema}= require('../../auth/middlewares/validator')

router.use(Authenticateuser)

router.get('/get-profile',UserProfileController.UserProfileController)
router.put('/update-profile',validate(passwordSchema), UserProfileController.UpdateProfileController)

module.exports =router