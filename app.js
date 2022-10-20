const fs = require('fs');

class Contenedor{
    constructor(archivo, id ){
        this.archivo = `./${archivo}.txt`
        this.id = 1
    }

    async save(objeto){
        try{
            if(!fs.existsSync(this.archivo)) {
                await fs.promises.writeFile(this.archivo, JSON.stringify([
                    {
                        id: this.id,
                        ...objeto
                    }
                ]));
                console.log(`Has agregado ${objeto.title} con el id ${this.id}`)
            }else{
                const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
                const json = JSON.parse(archivo);
                if(json.length > 0){
                    json.push({
                        id: json.length + 1,
                        ...objeto
                    })
                    await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                    console.log(`Has agregado ${objeto.title} con el id ${json.length}`)
                }
            }
        }
        catch(e){
            console.log(`Ha habido un error al leer el archivo ${this.archivo}`)
        }
    }

    async getById(id){
        try {
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo);
            if (json.length > 0) {
                const obj = json.find(obj => obj.id === id)
                if (obj) return console.log(obj) 
            }
            console.log("Objeto no existente")
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo);
            if (json.length > 0) {
                return json
            }
            console.log("Archivo vacio")
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo);
            if (json.length > 0) {
                const index = json.findIndex(obj => obj.id === id)
                if (index === -1) {
                    console.log(`El objeto no existe`)
                } else {
                    json.splice(index, 1)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                }
            }
        }catch(error){
            console.log(error)
        } 
    } 

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.archivo, "[]")
        } catch (error) {
            console.log(error)
        }
    }

}

const archivo = new Contenedor("productos");


const express = require('express');

const app = express()

const PORT = 8080

app.get('/', (request, response) => {
    response.send("Servidor - Nadir Blanco Sanchez")
})

app.get('/productos', (req, res) => {
    archivo.getAll().then(response => {
        res.send(response)
    })
})

app.get('/productoRandom', (req, res) => {
    archivo.getAll()
    .then(response => {
        const numero = Math.random() * response.length 
        const numeroArray = Math.round(numero)
        res.send(response[numeroArray])
    })
})

const server = app.listen(PORT, ()=>{
    console.log(`Servidor abierto en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(error)) 






