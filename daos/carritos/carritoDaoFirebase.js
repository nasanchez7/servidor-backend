const config = require("../.././config")
const contenedor = require("../.././Clases/Firebase")

const carritos = new contenedor("carritos")

const crud = async () => {
    await config.initFirebase()
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
    //await carritos.getById("BkbH848eWU3fMkG7w5Ax")
    //await carritos.deleteById("BkbH848eWU3fMkG7w5Ax")
    //await carritos.deleteAll()
}

crud()