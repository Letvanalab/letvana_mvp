require('dotenv').config();
const app = require('../app.js');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Letvana Backend Server is running on port ${PORT}`);
  // console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  // console.log(`Health check: http://localhost:${PORT}/health`);
  // console.log(`Listings API: http://localhost:${PORT}/api/listings`);
});

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM signal received: closing HTTP server');
//   server.close(() => {
//     console.log('HTTP server closed');
//     process.exit(0);
//   });
// });

// process.on('SIGINT', () => {
//   console.log('SIGINT signal received: closing HTTP server');
//   server.close(() => {
//     console.log('HTTP server closed');
//     process.exit(0);
//   });
// });