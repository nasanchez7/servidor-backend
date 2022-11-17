//Modulos y clases
const Carrito = require('./Clases/Carrito')
const Contenedor = require('./Clases/Contenedor')
const express = require('express');
const { Router } = express;
const app = express()

//Definicion de clases
const productos = new Contenedor("productos");
const carrito = new Carrito("carritos");

//Rutas definidas
const productosRuta = Router();
const carritoRuta = Router();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', productosRuta)
app.use('/api/carrito', carritoRuta)
app.use(express.static(__dirname + '/public'))

const PORT = 8080

//Endpoints de productos
productosRuta.get('/', (req, res) => {
    productos.getAll().then(response => {
        res.send(response)
    })
})

productosRuta.post('/', (req, res) => {
    const producto = req.body;
    productos.save(producto)
    res.send({msj: `Agregaste el producto ${producto.title}`})
})

productosRuta.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    productos.deleteById(id)
    res.send({msj: `Eliminaste el producto con el id ${id}`})
})

productosRuta.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    productos.getById(id).then(response => {
        res.send(response)
    })
})

productosRuta.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const producto = await productos.getById(id)
    const productoNuevo = {
        id: id,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };
    await productos.deleteById(id)
    await productos.save(productoNuevo)
    res.send({msj: `Actualizaste el producto ${producto.title}`})
}) 


//Endpoints de carrito
carritoRuta.post('/', async (req, res) => {
    res.send(await carrito.save())
})

carritoRuta.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    res.send(await carrito.deleteById(id))
})

carritoRuta.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    res.send(await carrito.getById(id))
})

carritoRuta.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const producto = req.body;
    res.send(await carrito.saveProduct(id, producto))
})

carritoRuta.delete('/:id/productos/:idProd', async (req, res) => {
    const idCarrito = parseInt(req.params.id)
    const idProducto = parseInt(req.params.idProd)
    res.send(await carrito.deleteProduct(idCarrito, idProducto))
})

//Manejo de errores
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `Ruta no implementada`});
});

const server = app.listen(PORT, ()=>{
    console.log(`Servidor abierto en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(error)) 








