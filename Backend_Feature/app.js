//main entry file for letvana mvp
const express= require('express')
const http = require ('http')
const dotenv= require('dotenv')
const routes= require('./routes/index')
const authORoutes = require('./auth/routes/authO.Routes')


dotenv.config()

const app= express();

app.use('/api/v1',routes )
router.use('/auth', authORoutes)

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const PORT = process.env.PORT 

const server=  http.createServer(app)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

