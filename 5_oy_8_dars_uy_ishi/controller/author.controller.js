const BookSchema = require("../schema/book.schema");
const AuthorSchema = require("../schema/suthor.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
};

const search = async (req, res, next) => {
  try {
    const {name} = req.query
    const searchingResult = await AuthorSchema.find({
      full_name: {$regex: name, $options: "i"}
    });
    res.status(200).json(searchingResult);
  } catch (error) {
    next(error)
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const {
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativty,
      region,
      /*phone_number*/
    } = req.body;

    await AuthorSchema.create({
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativty,
      region,
      /*phone_number*/
    });
    res.status(201).json({
      message: "Added author",
    });
  } catch (error) {
    next(error)
  }
};

const getOneAutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id);

    if (!author) {
     throw CustomErrorHandler.NotFound("Author not found")
    }

    const foundedBooks = await BookSchema.find({author_id: id})

    res.status(200).json({author, foundedBooks});
  } catch (error) {
    next(error)
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativty,
      region,
    } = req.body;
    const author = await AuthorSchema.findById(id);

    if (!author) {
     throw CustomErrorHandler.NotFound("Author not found")
    }

    await AuthorSchema.findByIdAndUpdate(id, {
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativty,
      region,
    });

    res.status(201).json({
        message: "Author updated"
    })
  } catch (error) {
    next(error)
  }
};
const deleteAuhtor = async (req, res, next) => {
    try {
        const {id} = req.params
        const author = await AuthorSchema.findById(id)
        
        if (!author) {
     throw CustomErrorHandler.NotFound("Author not found")
        }
        await AuthorSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Author deleted"
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
  getAllAuthors,
  addAuthor,
  getOneAutor,
  updateAuthor,
  deleteAuhtor,
  search
};
