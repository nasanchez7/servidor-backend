const mongoose = require('mongoose')

class MongoDb {

    constructor(collection, schema){
        this.collection = collection
        this.schema = schema
    }

    async save(objeto){
        const collectionSchema = new mongoose.Schema(this.schema)
        const collections = mongoose.model(this.collection, collectionSchema)
        const saveObjModel = new collections(objeto)
        const save = await saveObjModel.save()
        console.log(save)
    }

    async getByName(name){
        const collectionSchema = new mongoose.Schema(this.schema)
        const collections = mongoose.model(this.collection, collectionSchema)
        const elemento = await collections.find().where({title: name});
        console.log(elemento)
    }

    async getAll(){
        const collectionSchema = new mongoose.Schema(this.schema)
        const collections = mongoose.model(this.collection, collectionSchema)
        const listaElementos = await collections.find();
        console.log(listaElementos)
    }

    async deleteByName(name){
        const collectionSchema = new mongoose.Schema(this.schema)
        const collections = mongoose.model(this.collection, collectionSchema)
        const eliminarElemento = await collections.deleteOne({title: name})
        console.log(eliminarElemento)
    } 

    async deleteAll(){
        const collectionSchema = new mongoose.Schema(this.schema)
        const collections = mongoose.model(this.collection, collectionSchema)
        const eliminarElementos = await collections.deleteMany()
        console.log(eliminarElementos)
    }


}

module.exports = MongoDb