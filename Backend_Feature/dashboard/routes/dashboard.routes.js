const express = require('express');
const landlordDashboardController = require('../controller/landlordDashboard.controller');
const { Authenticateuser } = require('../../auth/middlewares/auth.middleware');

const router = express.Router();

router.get('/landlord', Authenticateuser, landlordDashboardController.LandlordDashboardController);

module.exports = router;