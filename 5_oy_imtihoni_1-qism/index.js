const express = require("express")
const cors = require("cors")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.config")
const AuthRouter = require("./router/auth.routes")
const UserRouter = require("./router/user.routes")
const errorMiddleware = require("./middleware/error.middleware")

const app = express()

const PORT = process.env.PORT || 3000
app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(cookieParser())

connectDB()

// router 

app.use(AuthRouter)
app.use(UserRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log("Ishladi: " + PORT);
})