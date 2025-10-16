//Main file for routes across diff folder/feature
const express = require('express');
const router=  express.Router();
const adminAuthRoutes = require('../auth/routes/adminAuth.Routes')
const userAuthRoutes= require('../auth/routes/userAuth.Routes')
const dashboardRoutes =require('../dashboard/routes/dashboard.routes')
const userRoutes = require('../user/routes/userProfile.routes')
const listingsRoutes = require('../listings/routes/listings.routes');

router.use('/profile', userRoutes)
router.use('/admin', adminAuthRoutes)
router.use('/user', userAuthRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/api/listings', listingsRoutes);

module.exports=router