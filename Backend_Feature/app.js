//main entry file for letvana mvp
const express= require('express')
const http = require ('http')
const dotenv= require('dotenv')
const adminAuthRoutes = require('./auth/routes/authRoutes')
const authORoutes = require('./auth/routes/authORoutes')

const app= express();
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.send('LETVANA PORT IS ACTIVE')
})

app.use('/api/v1/user', adminAuthRoutes)
app.use('/api/v1/auth', authORoutes)


app.get('/callback', (req, res)=>{
    res.send(req.oidc.user)
})


const PORT = process.env.PORT 

const server=  http.createServer(app)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

