const mongoose = require('mongoose')
const admin = require("firebase-admin");
const serviceAccount = require("./ecommerce-backend-6d4da-firebase-adminsdk-l5bim-65aea6b18f.json");

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
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
    console.log("servidor iniciado firebase")
}

module.exports = {initMongoDB, initFirebase}