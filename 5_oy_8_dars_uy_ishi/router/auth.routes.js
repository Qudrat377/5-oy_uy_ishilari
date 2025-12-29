const { Router } = require("express")
const { register, login, verify, logout, resendOtp, forgotPassword, getOneuser } = require("../controller/auth.controller")
const refreshToken = require("../middleware/refresh-token")
const authValidationMiddleware = require("../middleware/auth-validation.middleware")

const AuthRouter = Router()

AuthRouter.post("/register", authValidationMiddleware, register)
AuthRouter.post("/verify", verify)
AuthRouter.post("/login", login)
AuthRouter.get("/refresh", refreshToken)
AuthRouter.get("/logout", logout)
AuthRouter.post("/resend_otp", resendOtp)
AuthRouter.post("/forgot_password", forgotPassword)
AuthRouter.get("/get_one_user/:id", getOneuser)

module.exports = AuthRouter