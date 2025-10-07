const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
// Use the generated Prisma client output (schema.prisma has `output = "../generated/prisma"`)
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()
const {User,Board,Task,SubTask,UserLogin} = require('../models/schema')

router.get('/start',(req,res)=>{
    res.send('Router Setup')
})


router.post('/create/users',async (req,res)=>{
    const {error,value} = User.validate(req.body)
    if(error){
        return res.status(400).send(`Error Validating ${error}`)
    }
    const hashed_password = await bcrypt.hash(value.password, 10)
    console.time('Creating Users')
    try {
        let data = await prisma.user.create({
        data:{...value,password:hashed_password}
        })   
        console.timeEnd('Creating Users')
        console.log(data)
        return res.status(201).json({id: data.id, username: data.username, email: data.email})
    } catch (error) {
        console.error(error)
        return res.status(500).send(`Error Occured ${error}`)
    }
})

// // graceful shutdown for Prisma client
// process.on('SIGINT', async () => {
//     try { await prisma.$disconnect() } catch (e) { /* ignore */ }
//     process.exit(0)
// })
// TODO Finishing unhashing pass and setting up JWT 
router.post('login/users',async (req,res)=>{
    const {error,value} = UserLogin.validate(req.body)
    if(error){
        return res.status(400).json({"Error":error})
    }
    try {
        // TODO Keep off the main thread and then these async long ops should be in a separate thread 
        const unhashed_pass = await bcrypt.compare
        const data = await prisma.user.findFirst({
            where:{
                email:req.body.email,

            }
        })
    } catch (error) {
        
    }
})
// TODO Fix to get the logged in user 
router.get('/logged-in',(req,res)=>{})

// TODO Fetching all user and using redis to cache these users 


// Delete All_users route (TESTING )☠️
router.delete('/delete-all',async(req,res)=>{
    try {
        console.time('Deleting all users')
        const data = await prisma.user.deleteMany({})
        console.timeEnd('Deleting all users')
        res.status(200).send(`All Data is deleted ${data}`)
    } catch (error) {
        console.log(error);
        res.send('Error occured check console')
    }
})

module.exports = {router}