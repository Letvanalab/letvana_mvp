//main entry file for letvana mvp
const express= require('express')
const http = require ('http')
const dotenv= require('dotenv')
const routes= require('./routes/index')
const authORoutes = require('./auth/routes/authO.Routes')
const router = express.Router()

dotenv.config()

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',routes )
router.use('/auth', authORoutes)

const PORT = process.env.PORT 

const server=  http.createServer(app)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

module.exports =app
