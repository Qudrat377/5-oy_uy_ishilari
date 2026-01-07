const multer = require("multer")
const {extname} = require("path")

// multer 

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        const uiquieName = file.fieldname + "_" + Date.now()

        const ext = extname(file.originalname)
        const name_Image = `${uiquieName}${ext}`
        req.image = name_Image
        return cb(null, name_Image)
    }
})

const upload = multer({storage})

module.exports = {
    upload
}