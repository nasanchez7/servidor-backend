const config = require("../.././config")
const contenedor = require("../.././Clases/MongoDB")

const carritos = new contenedor("carritos", {
    timestamp: {type: String, require: true, max: 100},
    productos: {type: Array, require: true}
})

const crud = async () => {
    await config.initMongoDB()
    /*await carritos.save({timestamp: 1668707944425,productos: [{
        timestamp:2134124,
        nombre:"zapatillas nike",
        descripcion:"air max nike",
        codigo:213124,
        foto:"/airmax.png",
        precio:12323,
        stock:6
    }]})*/
    //await carritos.getAll()
    //await carritos.getByName("Remera Adidas")
    //await carritos.deleteAll()
    //await carritos.deleteByName("Remera Adidas")
}

crud()
