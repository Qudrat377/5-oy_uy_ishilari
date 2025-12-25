const {Router} = require("express")
const { getAllUsers, deleteUser } = require("../controller/user.controller")

const userRouter = Router()

userRouter.get("/get_all_users", getAllUsers)
userRouter.delete("/delete_user/:id", deleteUser)

module.exports = {
    userRouter
}