const express = require("express")
const cors = require("cors")
require("dotenv").config()
// const requestLogger = require("./middleware/middleware.logger") //logger
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.config")
const AuthRouter = require("./router/auth.routes")
const UserRouter = require("./router/user.routes")
const errorMiddleware = require("./middleware/error.middleware")
const CotegoryRouter = require("./router/cotegory.routes")
const { UploadRouter } = require("./router/upload.routes")
const { SuperAdminRouter } = require("./router/superadmin.routes")
const MadelRouter = require("./router/madel.routes")
const { AdminPanelRouter } = require("./router/adminPanel.routes")
const logger = require("./Utils/logger")
const SevedRouter = require("./router/seved.routes")

const app = express()

const PORT = process.env.PORT || 3000
app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(cookieParser())

connectDB()

// upload 

app.use("/images", express.static("upload/images"));

// router 

// app.use(requestLogger) //logger
app.use(AuthRouter)
app.use(UserRouter)
app.use(CotegoryRouter)
app.use(UploadRouter)
app.use(SuperAdminRouter)
app.use(MadelRouter)
app.use(AdminPanelRouter)
app.use(SevedRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log("Ishladi: " + PORT);
})