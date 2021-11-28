const express = require('express')
const routerProduct = require('./routes/products')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use('/static',express.static('uploads'))

app.use('/api', routerProduct)

app.listen(8080, () => {
    console.log('Server running')
})