const config = require("../.././config")
const contenedor = require("../.././Clases/Firebase")

const productos = new contenedor("productos")

const crud = async () => {
    await config.initFirebase()
    //await productos.save({title: "Remera Nike",price: 6200,thumbnail: "/remeranike1.png"})
    //await productos.getAll()
    //await productos.getById("BkbH848eWU3fMkG7w5Ax")
    //await productos.deleteById("BkbH848eWU3fMkG7w5Ax")
    //await productos.deleteAll()
}

crud()

