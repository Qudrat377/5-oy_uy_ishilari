const {Router} = require("express")
const { upload_img, upload_multi } = require("../controller/upload.controller")
const { upload } = require("../Utils/multer")

const dataRouter = Router()

dataRouter.post("/upload", upload.single("file"), upload_img)
dataRouter.post("/upload-multi", upload.array("files", Infinity), upload_multi)

module.exports = {
    dataRouter
}