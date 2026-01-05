const {Router} = require("express")
const { getAlluser, getOneuser } = require("../controller/user.controller")

const UserRouter = Router()

UserRouter.get("/get_all_users", getAlluser)
UserRouter.get("/get_one_users", getOneuser)

module.exports = UserRouter