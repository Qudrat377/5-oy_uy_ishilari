const CustomErrorHandler = require("../Utils/custom-error-handler")
const { BookValidator } = require("../validator/book.validation")

module.exports = function(req, res, next) {
    const {error} = BookValidator(req.body)

    if (error) {
       throw CustomErrorHandler.BadRequest(error.message)
    } 
    
    next()
}