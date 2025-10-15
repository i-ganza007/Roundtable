const { Worker } = require('worker_threads')
const path = require('path')

function UserCreationDefiner(data){
    const workerPath = path.resolve(__dirname, './UserCreation.js')
    const user_creation_worker = new Worker(workerPath, { workerData: data })
    return user_creation_worker
}


module.exports = { UserCreationDefiner }