const { Router } = require("express")
const { getAllAuthors, addAuthor, getOneAutor, updateAuthor, deleteAuhtor, search } = require("../controller/author.controller")
const AuthorValidationMiddleware = require("../middleware/Author-validation,middleware")
const { authorization } = require("../middleware/authorization")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/search", search)
authorRouter.post("/add_author", authorization, AuthorValidationMiddleware, addAuthor)
authorRouter.get("/get_one_author/:id", getOneAutor)
authorRouter.put("/update_author/:id", authorization, AuthorValidationMiddleware, updateAuthor)
authorRouter.delete("/delete_author/:id", authorization, AuthorValidationMiddleware, deleteAuhtor)

module.exports = authorRouter