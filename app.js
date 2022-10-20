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
                return console.log(json)
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

archivo.save({
    title: "Remera Adidas",
    price: 5200,
    thumbnail: "/remeraadidas1.png"
})

setTimeout(()=>{
    archivo.save({
        title: "Remera Nike",
        price: 6000,
        thumbnail: "/remeranike1.png"
    })
}, 2000)

setTimeout(()=>{
    archivo.save({
        title: "Remera Puma",
        price: 3200,
        thumbnail: "/remerapuma1.png"
    })
}, 3000)

setTimeout(()=>{
    archivo.deleteById(3)
}, 4000)

setTimeout(()=>{
    archivo.getAll()
}, 5000)

setTimeout(()=>{
    archivo.getById(1)
}, 6000)

setTimeout(()=>{
    archivo.deleteAll()
}, 7000)

