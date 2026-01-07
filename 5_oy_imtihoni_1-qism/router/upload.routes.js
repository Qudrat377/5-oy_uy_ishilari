const {Router} = require("express")
const { upload_img, upload_multi } = require("../controller/upload.controller")
const {upload} = require("../Utils/multer")

const UploadRouter = Router()

UploadRouter.post("/upload", upload.single("file"), upload_img)
UploadRouter.post("/upload-multi", upload.array("files", 3), upload_multi)

module.exports = {
    UploadRouter
}