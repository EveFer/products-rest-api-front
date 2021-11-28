const { Router } = require('express')
const Products = require('../libs/class')
const upload  = require('../libs/multer')

const products = new Products('./products.json')

const router = Router()

router.post('/products', upload.single('thumbnail'), async (req, res) => {
    try {
        const file = req.file
        if(!file) throw new Error('Por favor ingresa una imagen')
        const thumbnail = `${req.protocol}://${req.get('Host')}/static/${file.originalname.replaceAll(' ', '')}`;
        const product = JSON.parse(req.body.product)
        const productCreated = await products.save({ ...product, thumbnail })
        res.json({
            message: 'Producto Creado',
            product: productCreated
        })
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
})


router.get('/products', async (req, res) => {
    try {
        const allProducts = await products.getAll()
        res.json({
            products: allProducts
        })
    } catch (error) {
        res.status(400).json({ error})
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await products.getById(parseInt(id))
        
        res.json({
            product
        })
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
})


router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        await products.deleteById(parseInt(id))
        res.json({
            message: 'Producto Eliminado'
        })
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
})

router.patch('/products/:id', upload.single('thumbnail'), async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.body)
        const productToUpdate = JSON.parse(req.body.product)
        const file = req.file
        let productUpdated
        if(file) {
            const thumbnail = `${req.protocol}://${req.get('Host')}/static/${file.originalname.replaceAll(' ', '')}`;
            productUpdated = await products.updateById(parseInt(id), {...productToUpdate, thumbnail})
        }else {
            productUpdated = await products.updateById(parseInt(id), productToUpdate)
        }

        res.json({
            message: 'Producto Actualizado',
            product: productUpdated
        })
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
})

module.exports = router