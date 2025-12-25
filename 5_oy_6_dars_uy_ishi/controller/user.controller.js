const { RegisterSchema } = require("../schema/auth.schema")
const CustomErrorHandler = require("../Utils/custom-error-handler")

const getAllUsers = async (req, res, next) => {
    try {
        const users = await RegisterSchema.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const user = await RegisterSchema.findById(id)

        if (!user) {
           throw CustomErrorHandler.NotFound("User not found") 
        }

        await RegisterSchema.findByIdAndDelete(id)

        res.status(201).json({
            message: "Deleted user"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    deleteUser
}