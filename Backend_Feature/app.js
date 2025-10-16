//main entry file for letvana mvp
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const ApiResponse = require('./src/utils/responses');
const listingsRoutes = require('./listings/routes/listings.routes');
const { errorHandler } = require('./listings/middlewares/errorHandler.middleware');


const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger

// Health check endpoint
app.get('/health', (req, res) => {
  ApiResponse.success(res, { status: 'OK', timestamp: new Date() }, 'Server is running');
});

// API Routes
app.use('/api/listings', listingsRoutes);

// 404 handler
app.use((req, res) => {
  ApiResponse.notFound(res, 'Route not found');
});

// Global error handler
app.use(errorHandler);

module.exports = app;