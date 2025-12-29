const { Router } = require("express")
const { addCitation, updateCitation, deleteCitation } = require("../controller/citation.controller")
const authorization = require("../middleware/authorization")

const CitationRouter = Router()

CitationRouter.post("/add_citation", authorization, addCitation)
CitationRouter.put("/update_citation/:id", authorization, updateCitation)
CitationRouter.delete("/delete_citation/:id", authorization, deleteCitation)

module.exports = CitationRouter