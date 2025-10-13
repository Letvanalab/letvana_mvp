//import the prisma into other services to maintain DRY method

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

module.exports=prisma