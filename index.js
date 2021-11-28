const express = require('express')
const routerProduct = require('./routes/products')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use('/static',express.static('uploads'))

app.use('/api', routerProduct)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Server running')
})