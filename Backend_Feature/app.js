//main entry file for letvana mvp
const express= require('express')
const http = require ('http')
const dotenv= require('dotenv')
const routes= require('./routes/index')
const authORoutes = require('./auth/routes/authO.Routes')
const router = express.Router()
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const ApiResponse = require('./src/utils/responses');


// temp
const { errorHandler } = require('./listings/middlewares/errorHandler.middleware');

dotenv.config()

const app= express();

app.use(morgan('dev')); // HTTP request logger
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',routes )

router.use('/auth', authORoutes)

const PORT = process.env.PORT 

const server=  http.createServer(app)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use((req, res) => {
  ApiResponse.notFound(res, 'Route not found');
});

// Health check endpoint
app.get('/health', (req, res) => {
  ApiResponse.success(res, { status: 'OK', timestamp: new Date() }, 'Server is running');
});
app.use(errorHandler);


module.exports =app
