const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    }, 
    filename: function (req, file, cb) {
        console.log(file.originalname)
        const name = file.originalname.replace(/ /g, '')
        console.log(name)
        cb(null, name)
    }
})

const upload = multer({storage})

module.exports = upload 