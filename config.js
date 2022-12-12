const mongoose = require('mongoose')

async function initMongoDB() {
    try {
        const url = "mongodb://localhost:27017/ecommerce"
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("servidor iniciado mongodb")
    } catch (error) {
        console.log(error)
    }
}

async function initFirebase(){
    console.log("servidor iniciado firebase")
}

module.exports = {initMongoDB, initFirebase}