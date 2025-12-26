const Joi = require("joi")

exports.AuthValidator = function(data) {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string()
        })

    return schema.validate(data)
    } catch (error) {
        return resizeBy.status(500).json({
            message: error.message
        })
    }
}