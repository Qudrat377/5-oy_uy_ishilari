const CitationSchema = require("../schema/citation.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");

const addCitation = async (req, res, next) => {
  try {
    const { text, book_id } = req.body;

    const admin_id = req.user.id    

    await CitationSchema.create({
      text,
      book_id,
      admin_id
    });
    res.status(201).json({
      message: "Added Citation",
    });
  } catch (error) {
    next(error);
  }
};

const updateCitation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, book_id } = req.body;
    const Citation = await CitationSchema.findById(id);

    if (!Citation) {
      throw CustomErrorHandler.NotFound("Citation not founddd");
    }

    const admin_id = req.user.id    

    await CitationSchema.findByIdAndUpdate(id, {
      text,
      book_id,
      admin_id,
    });

    res.status(201).json({
      message: "Citation updated",
    });
  } catch (error) {
    next(error);
  }
};
const deleteCitation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Citation = await CitationSchema.findById(id);

    if (!Citation) {
      throw CustomErrorHandler.NotFound("Citation not found");
    }
    await CitationSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Citation deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCitation,
  updateCitation,
  deleteCitation,
};
