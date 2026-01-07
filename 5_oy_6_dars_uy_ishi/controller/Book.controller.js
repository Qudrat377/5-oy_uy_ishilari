const BookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await BookSchema.find().select("-_id")/*.skip(1).limit(2)*/ /*chapdagi loib lekish aytilganini o'ngdagi hammasini oladi*//*.populate("author_id", "_id full_name")*/;
    res.status(200).json(books);
  } catch (error) {
    next(error)
  }
};

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      author_id
    } = req.body;

    await BookSchema.create({
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      author_id
    });
    res.status(201).json({
      message: "Added book", 
    });
  } catch (error) {
    next(error)
  }
};

const getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await BookSchema.findById(id);

    if (!book) {
      throw CustomErrorHandler.NotFound("Book not found")
    }

    res.status(200).json(book);
  } catch (error) {
    next(error)
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
     title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      author_id
    } = req.body;
    const book = await BookSchema.findById(id);

    if (!book) {
      throw CustomErrorHandler.NotFound("Book not found")
    }

    await BookSchema.findByIdAndUpdate(id, {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      author_id
    });

    res.status(201).json({
        message: "Book updated"
    })
  } catch (error) {
    next(error)
  }
};

const deleteBook = async (req, res, next) => {
    try {
        const {id} = req.params
        const book = await BookSchema.findById(id)
        
        if (!book) {
      throw CustomErrorHandler.NotFound("Book not found")
        }
        await BookSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Book deleted"
        })

    } catch (error) {
    next(error)
    }
}

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook
};
