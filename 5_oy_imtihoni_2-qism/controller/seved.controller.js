const AuthSchema = require("../schema/auth.schema");
const CotegoriyaSchema = require("../schema/cotegoriya.schema");
const MadellarSchema = require("../schema/modellar.schema");
const SevedSchema = require("../schema/seved.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");
const logger = require("../Utils/logger");

const getAllSeveds = async (req, res, next) => {
  try {
    const access_id = req.user.id;

    const user = await AuthSchema.findById(access_id);

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found in the database");
    }

    const Seved = await SevedSchema.find({ oner_id: access_id });
    const madel = await MadellarSchema.find();

    let madellar = [];

    // if (req.user.role !== "superadmin") {

    for (let i = 0; i < madel.length; i++) {
      for (let j = 0; j < Seved.length; j++) {
        if (`${madel[i]._id}` === `${Seved[j].madel_id}`) {
          madellar.push(madel[i]);
        }
      }
    }

    res.status(200).json(madellar);
    // }
  } catch (error) {
    next(error);
  }
};

const addSeved = async (req, res, next) => {
  try {
    const { id } = req.body;
    // const { id } = req.params;

    const access_id = req.user.id;
    const user = await AuthSchema.findById(access_id);

    if (!user._id) {
      throw CustomErrorHandler.NotFound("user not found");
    }

    const madel = await MadellarSchema.findById(id);

    if (!madel) {
      throw CustomErrorHandler.NotFound("Bu categorya toyifasi topilmadi");
    }

    await SevedSchema.create({ oner_id: user._id, madel_id: madel._id });

    res.status(201).json({
      message: "Seved new Madel",
    });
  } catch (error) {
    next(error);
  }
};

const deleteSeved = async (req, res, next) => {
  try {
    const { id } = req.body;

    const user = await AuthSchema.findById(req.user.id);

    // o'zi qo'shganlarni o'chira olishligi uchun bu kodlar faqat ifni ichi

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found in the database");
    }

    const Seved = await SevedSchema.find({ oner_id: user._id });

    if (!Seved) {
      throw CustomErrorHandler.NotFound("Seved not found");
    }

    const seved_baza = await SevedSchema.findById(id);

    if (!seved_baza) {
      throw CustomErrorHandler.NotFound("Seved not found in the database");
    }

    for (let j = 0; j < Seved.length; j++) {
      if (`${Seved[j]._id}` === `${id}`) {
        await SevedSchema.findByIdAndDelete(id);

        res.status(200).json({
          message: "Seved deleted",
        });
      } else {
        res.status(200).json({
          message: "This seved is not yours",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSeveds,
  addSeved,
  deleteSeved,
};
