const fs = require('fs');

class Carrito {
    constructor(archivo){
        this.archivo = `./db/${archivo}.txt`
        this.id = 1
    }

    async save(){
        try{
            if(!fs.existsSync(this.archivo)) {
                await fs.promises.writeFile(this.archivo, JSON.stringify([
                    {
                        id: this.id,
                        timestamp: Date.now(),
                        productos: []
                    }
                ]));
                return { msj: `Has creado el carrito con el id ${this.id}`}
            }else{
                const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
                const json = JSON.parse(archivo);
                if(json.length > 0){
                    json.push(
                        {
                            id: json.length + 1,
                            timestamp: Date.now(),
                            productos: []
                        }
                    )
                    await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                    return { msj: `Has creado el carrito con el id ${json.length}`}
                }
            }
        }
        catch(e){
            console.log(`Ha habido un error al leer el archivo ${this.archivo}`)
        }
    }

    async deleteById(id){
        try {
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo);
            if (json.length > 0) {
                const index = json.findIndex(obj => obj.id === id)
                if (index === -1) {
                    return {msj: `El carrito con el id ${id} no existe`}
                } else {
                    json.splice(index, 1)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                    return {msj: `Has eliminado el carrito con el id ${id}`}
                }
            }
        }catch(error){
            console.log(error)
            return {msj: `El carrito con el id ${id} no existe`}
        } 
    } 

    async getById(id){
        try {
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo);
            if (json.length > 0) {
                const obj = json.find(obj => obj.id === id)
                if (obj){
                    return obj.productos
                }else{
                    return {error: "El carrito no existe"}
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async saveProduct(id, product){
        try {
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo);
            if (json.length > 0) {
                const obj = json.find(obj => obj.id === id)
                if (obj){
                    obj.productos.push(product)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                    return obj.productos
                }else{
                    return {error: "El carrito no existe"}
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id, idProduct){
        try {   
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo);
            if (json.length > 0) {
                const carrito = json.find(obj => obj.id === id)
                if (carrito){
                    const index = carrito.productos.findIndex(producto => producto.id === idProduct)
                    if (index === -1) {
                        return {msj: `El producto con el id ${idProduct} no existe`}
                    } else {
                        carrito.productos.splice(index, 1)
                        await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                        return {msj: `Has eliminado el producto con el id ${idProduct}`}
                    }
                }else{
                    return {error: `El carrito con el id ${id} no existe`}
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }
} 

module.exports = Carrito