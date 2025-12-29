const CustomErrorHandler = require("../Utils/custom-error-handler")
const { AuthorValidator } = require("../validator/author.validation")

module.exports = function(req, res, next) {
    const {error} = AuthorValidator(req.body)

    if (error) {
       throw CustomErrorHandler.BadRequest(error.message)
    } 
    
    next()
}