const multer = require("multer")
const {extname} = require("path")

// multer 

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        const uiquieName = file.fieldname + "_" + Date.now()

        const ext = extname(file.originalname)
        return cb(null, `${uiquieName}${ext}`)
    }
})

const upload = multer({storage})

module.exports = {
    upload
}