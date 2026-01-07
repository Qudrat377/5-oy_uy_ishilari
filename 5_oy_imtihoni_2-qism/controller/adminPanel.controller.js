const AuthSchema = require("../schema/auth.schema");
const CotegoriyaSchema = require("../schema/cotegoriya.schema");
const MadellarSchema = require("../schema/modellar.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");

const getAllCotegoriysAdmin = async (req, res, next) => {
  try {
    const userData = req.user;
    const user = await AuthSchema.findById(userData.id);

    if (!user._id) {
      throw CustomErrorHandler.NotFound("user not found");
    }

    if (userData.role !== "superadmin") {
      const Cotegoriy = await CotegoriyaSchema.find({ oner_id: user._id });
      res.status(200).json(Cotegoriy);
    } else {
      const Cotegoriy = await CotegoriyaSchema.find();
      res.status(200).json(Cotegoriy);
    }
  } catch (error) {
    next(error);
  }
};

const getAllMadelsAdmin = async (req, res, next) => {
  try {
    const userData = req.user;
    const user = await AuthSchema.findById(userData.id);

    if (!user._id) {
      throw CustomErrorHandler.NotFound("user not found");
    }

    if (userData.role !== "superadmin") {
      const Madel = await MadellarSchema.find({ oner_id: user._id });
      res.status(200).json(Madel);
    } else {
      const Madel = await MadellarSchema.find();
      res.status(200).json(Madel);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllCotegoriysAdmin,
    getAllMadelsAdmin,
}