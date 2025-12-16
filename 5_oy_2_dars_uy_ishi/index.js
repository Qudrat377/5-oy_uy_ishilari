const express = require("express")
const cors = require("cors")
const { dataRouter } = require("./router/upload.routes")

const app = express()
const PORT = process.env.PORT || 4025
app.use(express.json())
app.use(cors())

app.use("/images", express.static("upload/images/Landshaft"))

// router 

app.use(dataRouter)

app.listen(PORT, () => {
    console.log("server is runing at: " + PORT)
})