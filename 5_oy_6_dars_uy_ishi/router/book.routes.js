const { Router } = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook } = require("../controller/Book.controller")
const bookValidationMiddleware = require("../middleware/book-validation.middleware")
const { authorization } = require("../middleware/authorization")

const bookRouter = Router()

bookRouter.get("/get_all_books", getAllBooks)
bookRouter.post("/add_book", authorization, bookValidationMiddleware, addBook)
bookRouter.get("/get_one_book/:id", getOneBook)
bookRouter.put("/update_book/:id", authorization, bookValidationMiddleware, updateBook)
bookRouter.delete("/delete_book/:id", authorization, bookValidationMiddleware, deleteBook)

module.exports = bookRouter