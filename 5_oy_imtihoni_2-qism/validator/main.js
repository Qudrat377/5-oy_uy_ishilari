const AuthSchema = require("../schema/auth.schema");
const CotegoriyaSchema = require("../schema/cotegoriya.schema");
const MadellarSchema = require("../schema/modellar.schema");
const SevedSchema = require("../schema/seved.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");
const logger = require("../Utils/logger");

const getAllSeveds = async (req, res, next) => {
  try {
    const access_id = req.user.id;

    const user = await AuthSchema.findById(access_id)
    
    if (!user) {
        throw CustomErrorHandler.NotFound("User not found in the database")
    }

    if (req.user.role !== "superadmin") {
      const Seved = await SevedSchema.find({ oner_id: access_id });
      const madel = await MadellarSchema.find()

      let madellar = []

      console.log(madellar);
      

      for (let i = 0; i < madel.length; i++) {
          if (madel[i]._id === Seved.madel_id) {
            madellar.push(madel[i])
          }
      }
      res.status(200).json(madel);
    }
  } catch (error) {
    next(error);
  }
};