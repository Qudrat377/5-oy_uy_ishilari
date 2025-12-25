const { RegisterSchema } = require("../schema/auth.schema")
const CustomErrorHandler = require("../Utils/custom-error-handler")

const SuperAdmin = async (req, res, next) => {
    try {
        const {id} = req.params
        const userdata = await RegisterSchema.findById(id)

        if (!userdata) {
            throw CustomErrorHandler.NotFound("ID bo'yicha malumot topilmadi")
        }

        const {role} = req.body

        if (!role) {
            throw CustomErrorHandler.NotFound("Malumot topilmadi")
        }

        await RegisterSchema.findByIdAndUpdate(id, {role})

        res.status(201).json({
            message: "Adminga tayinlandi"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    SuperAdmin
}
