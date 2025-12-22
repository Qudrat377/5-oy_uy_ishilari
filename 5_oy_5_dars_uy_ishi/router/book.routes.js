const { Router } = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook } = require("../controller/Book.controller")

const bookRouter = Router()

bookRouter.get("/get_all_books", getAllBooks)
bookRouter.post("/add_book", addBook)
bookRouter.get("/get_one_book/:id", getOneBook)
bookRouter.put("/update_book/:id", updateBook)
bookRouter.delete("/delete_book/:id", deleteBook)

module.exports = bookRouter