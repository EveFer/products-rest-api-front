
const URL_BASE = 'http://localhost:8080/api'

function createProduct (product) {
    const url = `${URL_BASE}/products`
    const options = {
        method: 'POST',
        body: product
    }
    return fetch(url, options)
}

function getProduct (id) {
    const url = `${URL_BASE}/products/${id}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    return fetch(url, options)
}

function getProducts () {
    const url = `${URL_BASE}/products/`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    return fetch(url, options)
}

function deleteProduct (id) {
    const url = `${URL_BASE}/products/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }
    return fetch(url, options)
}



function updateProduct (id, product) {
    const url = `${URL_BASE}/products/${id}`
    const options = {
        method: 'PATCH',
        body: product,
        mode: 'cors',
    }
    return fetch(url, options)
}

export {
    createProduct, 
    getProduct, 
    getProducts, 
    deleteProduct, 
    updateProduct
}