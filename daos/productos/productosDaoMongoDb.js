const config = require("../.././config")
const contenedor = require("../.././Clases/MongoDB")

const productos = new contenedor("productos", {
    title: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true, max: 100}
})

const crud = async () => {
    await config.initMongoDB()
    //await productos.save({title: "Remera Adidas",price: 5000,thumbnail: "/remeraadidas1.png"})
    //await productos.getAll()
    //await productos.getByName("Remera Adidas")
    //await productos.deleteAll()
    //await productos.deleteByName("Remera Adidas")
}

crud()