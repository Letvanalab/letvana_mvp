const Redis = require('redis')
const dotenv =require('dotenv')

dotenv.config()

const REDIS_URL= process.env.REDIS_URL

const client = await Redis.createClient({
    url:REDIS_URL
})
client.on('connect',() => {
    console.log('Redis connected successfully')
})

client.on('error',()=>{
    console.error('Redis error:', err)
});

(async ()=>{
    await client.connect();
}) ();



