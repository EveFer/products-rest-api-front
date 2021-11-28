const fs  = require('fs')

class Contenedor {
    constructor(file){
        this.file = file
    }

    static id = 0

    static async getProducts (file) {
        try {
            const content = await fs.promises.readFile(file, 'utf-8')
            if(content) {
                const products = JSON.parse(content)
                return products
            }
            return null
        } catch (error) {
            // await fs.promises.writeFile(file, '[]')
            throw new Error(error)
        }
        
    }

    async save(product){
        try {
            let products = await Contenedor.getProducts(this.file)
            if(products.length === 0) {
                Contenedor.id++
            }else {
                Contenedor.id = products[products.length - 1].id 
                Contenedor.id++
            }
            if(!product) throw new Error('No enviaste un producto para guardar')
            product.id = Contenedor.id
            products = [...products, product]
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            return product

        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id){
        // return objeto del id de lo contrario null
        try {
            const products = await Contenedor.getProducts(this.file)
            const productFound = products.find(product => product.id === id)
            if(!productFound) throw new Error('No existe el producto')
            return productFound
        } catch (error) {
            throw new Error(error)
        }
    }

   async getAll(){
        // return array con todos los objetos
        try {
            const products = await Contenedor.getProducts(this.file)
            return products
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id){
        // Elimna del archivo el objeto con el id
        try {
            const products = await Contenedor.getProducts(this.file)
            const productToDelete = products.find(product => product.id === id)
            if(!productToDelete) throw new Error('El producto no existe')
            const newProducts = products.filter(product => product.id !== id)
            const { thumbnail } = productToDelete
            console.log(thumbnail)
            console.log(thumbnail.split('http://localhost:8080/static/')[1])
            await fs.promises.unlink(`uploads/${thumbnail.split('http://localhost:8080/static/')[1]}`)
            await fs.promises.writeFile(this.file, JSON.stringify(newProducts, null, 2))
            return 'Producto Eliminado'
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAll(){
        // Elimina todos los objetos del archivo
        try {
            const products = await Contenedor.getProducts(this.file)
            products.splice(0, products.length)

            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(id, newData) {
        try {
            const products = await Contenedor.getProducts(this.file)
            const productToUpdate = products.find(product => product.id === id)
            if(!productToUpdate) throw new Error('El producto no existe')
            if(newData.thumbnail) {
                const { thumbnail: oldThumbnail } = productToUpdate
                let nameImageNew = newData.thumbnail.split('http://localhost:8080/static/')[1]
                let nameImageOld = oldThumbnail.split('http://localhost:8080/static/')[1]
                if( nameImageNew  !== nameImageOld)  await fs.promises.unlink(`uploads/${nameImageOld}`)
            }
            const indexProduct = products.findIndex(product => product.id === id);
            const productUpdated = {...productToUpdate,...newData}
            products.splice(indexProduct, 1, productUpdated)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            return productUpdated
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Contenedor