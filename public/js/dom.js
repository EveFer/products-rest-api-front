import { getProducts, deleteProduct, getProduct } from './services.js'

const getDataForm = () => {
    const inputs = document.querySelectorAll('.form-product input:not(input[type="file"])')
    const inputFile = document.querySelector('.form-product input[type="file"]')
    let newProduct = {}
    let product = {}
    inputs.forEach(input => {
        const { value, name } = input
        product[name] = value
        if(name === 'price') product[name] = parseFloat(value)
    })
    newProduct.product = product
    if(inputFile.files[0]) newProduct[inputFile.name] = inputFile.files[0]
    

    return newProduct
}

const fillForm = data => {
    const inputs = document.querySelectorAll('.form-product input:not(input[type="file"])')
    const {title, price} = data
    inputs.forEach(input => {
        const {name} = input
        if(name === 'price') input.value = price
        if(name === 'title') input.value = title
    })
}

const resetForm = () => {
    const inputs = document.querySelectorAll('.form-product input:not(input[type="file"])')
    const inputFile = document.querySelector('.form-product input[type="file"]')

    inputs.forEach(input => input.value= '')
    inputFile.value = ''
}

const showAlertSuccess = text => {
    const alertSuccess = document.querySelector('.alert-success')
    alertSuccess.classList.remove('hidden')
    alertSuccess.classList.add('show')
    alertSuccess.textContent = text
    setTimeout(() =>{
        alertSuccess.classList.remove('show')
        alertSuccess.classList.add('hidden')
    }, 2000)
}

const showAlertError = text => {
    const alertError = document.querySelector('.alert-danger')
    alertError.classList.remove('hidden')
    alertError.classList.add('show')
    alertError.textContent = text
    setTimeout(() =>{
        alertError.classList.remove('show')
        alertError.classList.add('hidden')
    }, 2000)
}

const printTable = async () => {
    const response = await getProducts()
    const { products } = await response.json()
    const wrapper = document.getElementById('wrapper-products')
    wrapper.innerHTML = ''
    const rows = products.reduce((acc, {title, price, id, thumbnail}, index) => {
        const row = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${title}</td>
                <td>$ ${price} MXN</td>
                <td> <img class="img-product" src="${thumbnail}" alt="${title}"> </td>
                <td>
                    <button data-id=${id} class="btn btn-danger btn-delete">Eliminar</button>
                    <button data-id=${id} class="btn btn-primary btn-update">Editar</button>
                </td>
            </tr>
        `
        return acc + row
    }, '')
    wrapper.innerHTML = rows

    document.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', removeProduct))
    document.querySelectorAll('.btn-update').forEach(btn => btn.addEventListener('click', patchProduct))
}

const removeProduct = async (event) => {
    const {id} = event.target.dataset
    const response = await deleteProduct(id)
    const json = await response.json()
    if(response.status === 200) {
        showAlertSuccess(json.message)
        await printTable()
    }else {
        showAlertError('No se puedo borrar el product')
    }
}

const patchProduct = async (event) => {
    const {id} = event.target.dataset
    const response = await getProduct(id)
    const {product} = await response.json()
    fillForm(product)
    controlButtonsUpdate()
    document.querySelector('#btn-patch').setAttribute('data-id-product', id)
}

const controlButtonsInitials = () => {
    document.querySelector('#btn-patch').disabled = true
    document.querySelector('#btn-save').disabled = false
}

const controlButtonsUpdate = () => {
    document.querySelector('#btn-patch').disabled = false
    document.querySelector('#btn-save').disabled = true
}

export { getDataForm, resetForm, printTable, showAlertSuccess, showAlertError,  controlButtonsInitials}