const AuthorSchema = require("../schema/suthor.schema");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorSchema.find();
    res.status(200).json(authors);
  } catch (error) {
    console.log(error.message);
  }
};

const addAuthor = async (req, res) => {
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
    });
    res.status(201).json({
      message: "Added author",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getOneAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(author);
  } catch (error) {
    console.log(error.message);
  }
};

const updateAuthor = async (req, res) => {
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
      return res.status(404).json({
        message: "Author not found",
      });
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
    console.log(error.message);
  }
};
const deleteAuhtor = async (req, res) => {
    try {
        const {id} = req.params
        const author = await AuthorSchema.findById(id)
        
        if (!author) {
            return res.status(404).json({
                message: "Auth,or not found"
            })
        }
        await AuthorSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Author deleted"
        })

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
  getAllAuthors,
  addAuthor,
  getOneAutor,
  updateAuthor,
  deleteAuhtor
};
