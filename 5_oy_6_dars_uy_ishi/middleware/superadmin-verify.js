const jwt = require("jsonwebtoken")
const CustomErrorHandler = require("../Utils/custom-error-handler")

const superadminTekshiruvchi = async (req, res, step) => {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) {
            throw CustomErrorHandler.NotFound("Bearer token topilmadi")
        }

        const token = bearerToken.split(" ")
        if (token[0] !== "Bearer") {
            throw CustomErrorHandler.NotFound("Bearer token talab qilinadi")
        }

        if (!token[1]) {
            throw CustomErrorHandler.NotFound("Token topilmadi")
        }

        const decode = jwt.verify(token[1], process.env.SECRET_KEY)

        if (decode.role !== "superadmin") {
            throw CustomErrorHandler.NotFound("Sen superadmin emassan")
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    superadminTekshiruvchi
}