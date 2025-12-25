const Joi = require("joi")

exports.AuthorValidator = function(data) {
    try {
const schema = Joi.object({
    full_name: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,50}$')).required(),
    birth_year: Joi.number().integer().required(),
    death_year: Joi.string().required(),
    image_url: Joi.string().min(15).required(),
    bio: Joi.string().max(10000).required(),
    genre: Joi.string().lowercase().valid("historical", "drama", "horror", "romance", "detective",
                "documentry", "sciencs fiction", "fantasy", "comedy", "reality", "animation", "triller", "advanture",
                "novel", "poetry", "satir", "mella dramma", "action").required(),
    period: Joi.string().lowercase().valid("temuriylar davri", "jadid adabiyoti", "sovet davri", "mustaqillik davri").required(),
    creativty: Joi.string().max(1000).required(),
    region: Joi.string().max(50).required()
})

return schema.validate(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}