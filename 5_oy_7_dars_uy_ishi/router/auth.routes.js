const { Router } = require("express")
const { register, login, verify, logout, getAllUsers, getOneUser, deleteUser, resetCod } = require("../controller/auth.controller")
const refreshToken = require("../middleware/refresh-token")
const authValidationMiddleware = require("../middleware/auth-validation.middleware")

const AuthRouter = Router()

AuthRouter.post("/register", authValidationMiddleware, register)
AuthRouter.post("/verify", verify)
AuthRouter.post("/login", login)
AuthRouter.get("/refresh", refreshToken)
AuthRouter.get("/logout", logout)
AuthRouter.get("/get_all_users", getAllUsers)
AuthRouter.get("/get_one_user/:id", getOneUser)
AuthRouter.delete("/delete_user/:id", deleteUser)
AuthRouter.post("/restart", resetCod)

module.exports = AuthRouter