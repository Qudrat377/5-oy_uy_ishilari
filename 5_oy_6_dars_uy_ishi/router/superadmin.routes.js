const {Router} = require("express")
const { SuperAdmin } = require("../controller/Superadmin.controller")
const { superadminTekshiruvchi } = require("../middleware/superadmin-verify")

const SuperAdminRouter = Router()

SuperAdminRouter.put("/super_admin/:id", superadminTekshiruvchi, SuperAdmin)

module.exports = {
    SuperAdminRouter
}