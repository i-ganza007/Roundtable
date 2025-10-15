const {workerData,parentPort} = require('worker_threads')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const {User} = require('../models/schema')

const prisma = new PrismaClient()

async function create_user(data){
    const {error,value} = User.validate(data)
    if(error){
        return {isError:true,response:'Validation',message:error.message}
    }
    // console.time('Creating Users')
    try {
        const hashed_password = await bcrypt.hash(value.password, 10)
        let data = await prisma.user.create({
        data:{...value,password:hashed_password}
        })   
        // console.timeEnd('Creating Users')
        console.log(data)
        return {isError:false,response:'Success',data}
    } catch (err) {
        console.error(err)
        return {isError:true,response:'DB Error',message:err.message}
    }
    finally{
        await prisma.$disconnect()
    }
}

create_user(workerData).then(result => parentPort.postMessage(result)).catch(err => {
        console.error('Worker catch:', err)
        parentPort.postMessage({isError:true,response:'WorkerError',message:err.message})
    })
