//main entry file for letvana mvp
const express= require('express')
const http = require ('http')
const dotenv= require('dotenv')
const adminAuthRoutes = require('./auth/routes/authAdmin.Routes')
const authORoutes = require('./auth/routes/authO.Routes')
const userAuthRoutes= require('./auth/routes/authUser.Routes')
// const { config } = require('./auth/config/authConfig')
// const authOController=require('./auth/controllers/authO.controller')
// const {HandleCallbackController}=require('./auth/controllers/authO.controller')


dotenv.config()

const app= express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//AUTHO CALLBACK ROUTE 
// app.use(config)
// // app.get('/callback',authOController.HandleCallbackController)
// app.get('/callback', HandleCallbackController)

app.use('/api/v1/admin', adminAuthRoutes)
app.use('/api/v1/auth', authORoutes)
app.use('/api/v1/user', userAuthRoutes)


// app.get('/callback', (req, res)=>{
//     res.send(req.oidc.user)
// })


const PORT = process.env.PORT 

const server=  http.createServer(app)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

