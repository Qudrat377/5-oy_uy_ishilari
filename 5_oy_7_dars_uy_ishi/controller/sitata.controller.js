const Sitataschema = require("../schema/sitata.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");

const getAllSitata = async (req, res, next) => {
  try {
    const Sitata = await Sitataschema.find()/*.select("-_id")*/ /*.skip(1).limit(2)*/ /*chapdagi loib lekish aytilganini o'ngdagi hammasini oladi*//*.populate("author_id", "_id full_name")*/;
    res.status(200).json(Sitata);
  } catch (error) {
    next(error)
  }
};

const addSitata = async (req, res, next) => {
  try {
    const {
      sitata,
      user_id,
      book_id
    } = req.body;

    await Sitataschema.create({
      sitata,
      user_id,
      book_id 
    });
    res.status(201).json({
      message: "Added Sitata", 
    });
  } catch (error) {
    next(error)
  }
};

const getOneSitata = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Sitata = await Sitataschema.findById(id);

    if (!Sitata) {
      throw CustomErrorHandler.NotFound("Sitata not found")
    }

    res.status(200).json(Sitata);
  } catch (error) {
    next(error)
  }
};

const updateSitata = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      sitata,
      user_id,
      book_id 
    } = req.body;
    const Sitata = await Sitataschema.findById(id);

    if (!Sitata) {
      throw CustomErrorHandler.NotFound("Sitata not found")
    }

    await Sitataschema.findByIdAndUpdate(id, {
      sitata,
      user_id,
      book_id 
    });

    res.status(201).json({
        message: "Sitata updated"
    })
  } catch (error) {
    next(error)
  }
};
const deleteSitata = async (req, res, next) => {
    try {
        const {id} = req.params
        const Sitata = await Sitataschema.findById(id)
        
        if (!Sitata) {
      throw CustomErrorHandler.NotFound("Sitata not found")
        }
        await Sitataschema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Sitata deleted"
        })

    } catch (error) {
    next(error)
    }
}

module.exports = {
  getAllSitata,
  getOneSitata,
  addSitata,
  updateSitata,
  deleteSitata
};
