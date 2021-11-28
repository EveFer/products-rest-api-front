import { getDataForm, resetForm, printTable, showAlertSuccess, showAlertError, controlButtonsInitials } from "./dom.js";
import { createProduct, updateProduct } from './services.js'

controlButtonsInitials()


document.getElementById('btn-save').addEventListener('click', async (e) => {
    const { thumbnail, product } = getDataForm()
    let formData = new FormData();
    formData.append('thumbnail', thumbnail);
    formData.append('product', JSON.stringify(product));
    const response = await createProduct(formData)
    const json = await response.json()
    if(response.status === 200) {
        showAlertSuccess(json.message)
        printTable()
    }else {
        showAlertError('Ah ocurrido un error D:')
    }
    resetForm()
})

document.getElementById('btn-patch').addEventListener('click', async (e) => {
    const {idProduct} = e.target.dataset
    const dataProduct = getDataForm()
    let formData = new FormData()
    if(dataProduct.thumbnail) formData.append('thumbnail', thumbnail)
    formData.append('product', JSON.stringify(dataProduct.product))
    const response = await updateProduct(idProduct, formData)
    const json = await response.json()
    if(response.status === 200) {
        showAlertSuccess(json.message)
        printTable()
    }else {
        showAlertError('Ah ocurrido un error D:')
    }
    resetForm()
    controlButtonsInitials()
})

printTable()