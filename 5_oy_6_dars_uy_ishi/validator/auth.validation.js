const Joi = require("joi")

exports.AuthValidator = function(data) {
    try {
        const schema = Joi.object({
            username: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,50}$')).required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string()
        })

return schema.validate(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}