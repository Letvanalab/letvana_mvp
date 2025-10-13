// server.js
const express =require('express')
const app =express()
const routes= require('./routes/index')
const dotenv= require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/v1',routes)



module.exports= app