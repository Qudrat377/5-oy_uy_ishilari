const AuthSchema = require("../schema/auth.schema");

const getAlluser = async (req, res, next) => {
    try {
    const user = await AuthSchema.find();

    res.status(200).json(user);        
    } catch (error) {
        next(error)
    }
}

const getOneuser = async (req, res, next) => {
    try {
    const { id } = req.params;
    const user = await AuthSchema.findById(id);

    if (!user) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    // const foundedBook = await BookSchema.find({ book_id: id });

    res.status(200).json(user);        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAlluser, 
    getOneuser
}