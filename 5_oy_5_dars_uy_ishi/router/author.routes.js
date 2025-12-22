const { Router } = require("express")
const { getAllAuthors, addAuthor, getOneAutor, updateAuthor, deleteAuhtor, search } = require("../controller/author.controller")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/search", search)
authorRouter.post("/add_author", addAuthor)
authorRouter.get("/get_one_author/:id", getOneAutor)
authorRouter.put("/update_author/:id", updateAuthor)
authorRouter.delete("/delete_author/:id", deleteAuhtor)

module.exports = authorRouter