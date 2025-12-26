const { Router } = require("express")
const { getAllSitata, addSitata, updateSitata, deleteSitata, getOneSitata } = require("../controller/sitata.controller")

const SitataRouter = Router()

SitataRouter.get("/get_all_Sitats", getAllSitata)
SitataRouter.post("/add_Sitata", addSitata)
SitataRouter.get("/get_one_Sitata/:id", getOneSitata)
SitataRouter.put("/update_Sitata/:id", updateSitata)
SitataRouter.delete("/delete_Sitata/:id", deleteSitata)

module.exports = SitataRouter