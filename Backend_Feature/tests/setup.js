const { PrismaClient } = require('@prisma/client');
const dotenv=require('dotenv')
require("dotenv").config({ path: ".env.tests" });
// const Prisma = require('../database/prisma')
dotenv.config()

let prisma ;

beforeAll(async ()=>{
    prisma=new PrismaClient ({
        datasources:{
            db: {
                url: process.env.DATABASE_URL_TEST
            }
        }
    })
    await prisma.$executeRawUnsafe('SELECT 1');

    global.prisma=prisma
});

afterEach(async ()=>{
 await prisma.rent_payments.deleteMany();
  await prisma.rental_agreements.deleteMany();
  await prisma.user_favorites.deleteMany();
  await prisma.properties.deleteMany();
  await prisma.users.deleteMany();
})


afterAll(async ()=>{
    await prisma.$disconnect()
})

module.exports= { }