const {Router} = require("express")
const {upload} = require("../Utils/multer")
const { getAllCotegoriys, addCotegory, getOneCotegory, updateCotegory, deleteCotegory, AllUpdeteCotegoriys } = require("../controller/cotegory.controller")
const cotegoryValidationMiddleware = require("../middleware/cotegory-validation.middleware")
const authorization = require("../middleware/authorization")
const protocol = require("../middleware/protocol")

const CotegoryRouter = Router()

CotegoryRouter.get("/get_all_cotegorys", protocol, getAllCotegoriys)
CotegoryRouter.get("/get_one_cotegory/:id", protocol, getOneCotegory)
CotegoryRouter.post("/add_cotegory", cotegoryValidationMiddleware, authorization, upload.single("file"), addCotegory)
CotegoryRouter.put("/update_cotegory/:id", cotegoryValidationMiddleware, authorization, upload.single("file"), updateCotegory)
CotegoryRouter.delete("/delete_cotegory/:id", authorization, deleteCotegory)
CotegoryRouter.put("/All_Updete_Cotegoriys", authorization, AllUpdeteCotegoriys)

module.exports = CotegoryRouter




