const {Router}= require("express")
const { register, login } = require("../controller/Auth.controller")
const authValidationMiddleware = require("../middleware/auth-validation.middleware")

const AuthRouter = Router()

AuthRouter.post("/register", authValidationMiddleware, register)
AuthRouter.post("/login", login)

module.exports = {
    AuthRouter
}