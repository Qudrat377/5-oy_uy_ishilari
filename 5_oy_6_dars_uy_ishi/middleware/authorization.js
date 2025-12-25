const jwt = require("jsonwebtoken")
const CustomErrorHandler = require("../Utils/custom-error-handler")

const authorization = (req, res, step) => {
 try {
    const bearerToken = req.headers.authorization

    if (!bearerToken) {
        throw CustomErrorHandler.NotFound("Bearer token not found")
    }

    const token = bearerToken.split(" ")

    if (token[0] !== "Bearer") {
        throw CustomErrorHandler.NotFound("Bearer token is required")
    }

    if (!token[1]) {
        throw CustomErrorHandler.NotFound("Token not found")
    }

    const decode = jwt.verify(token[1], process.env.SECRET_KEY)

    if (decode.role !== "admin" && decode.role !== "superadmin") {
       throw CustomErrorHandler.NotFound("You are not admin") 
    }

    step()
 } catch (error) {
    res.status(500).json({
    message: error.message,
    });
 }
}

module.exports = {
    authorization
}