const { Schema, model } = require("mongoose");

const Author = new Schema({
    full_name: {
        type: String,
        required: [true, "full_name kiritilishi shart"],
        unique: false /*[false, "full_name unique bo'lishi kerak"]*/,
        set: value => value.trim()/*.toUpperCase()*/,
        minLength: [3, "Kamida 3 ta harfdan iborat bo'lsin"],
        match: [/^[a-zA-Z]+$/, "faqat harf kiriting"],
        trim: true,
        // alias: "ism"
    },
    birth_year: {
        type: Number,
        required: true,
        max: [new Date().getFullYear() - 15, "Adib kamida 16 yosh bo'lishi kerak"],
        min: 0
    },
     death_year: {
        type: String,
        required: false,
        default: null,
        max: new Date().getFullYear()
    },
     image_url: {
        type: String,
        required: true,
        minLength: [15, "Kamida 15 ta harfdan iborat bo'lsin"],
    },
    bio: {
        type: String,
        required: true,
        maxLength: 10000,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        set: value => value.toLowerCase(),
        enum: {
            values: [
                "historical", "drama", "horror", "romance", "detective",
                "documentry", "sciencs fiction", "fantasy", "comedy", "reality", "animation", "triller", "advanture",
                "novel", "poetry", "satir", "mella dramma", "action"
                ],
            message: `{VALUE} bunday qiymat qabul qilanmaydi`
        }
    },
    period: {
        type: String,
        required: true,
        set: value => value.toLowerCase(),
        enum: {
            values: ["temuriylar davri", "jadid adabiyoti", "sovet davri", "mustaqillik davri"],
            message: `{VALUE} bunday qiymat qabul qilanmaydi`
        }
    },
    creativty: {
        type: String,
        required: true,
        maxLength: 1000
    },
    region: {
        type: String,
        required: true,
        maxLength: 50
    }
    // ,
    // phone_number: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: function(value) {
    //             return /^\+998\d{2} \d{3} \d{2} \d{2}/.test(value)
    //         },
    //         message: "telefon raqam formati: +99890 000 00 00 shu uslubda bo'lishi kerak"
    //     }
    // }
},
{
    versionKey: false,
    timestamps: true
}
)

Author.statics.findByFullName = function(value) {
    return this.find({full_name: value})
}

const AuthorSchema = model("Author", Author)

module.exports = AuthorSchema