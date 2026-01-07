const { Schema, model } = require("mongoose");

const Cotegoriya = new Schema({
    Companiy: {
        type: String,
        required: [true, "Modell nomi kiritilishi shart"],
        set: value => value.trim().toUpperCase(),
        unique: [true, "Modell nomi unique bo'lishi kerak"],
        minLength: [2, "Kamida 2 ta harfdan iborat bo'lsin"],
        match: [/^[a-zA-Z0-9 ]+$/, "faqat harf va raqam kiriting"],
    },
    img_url: {
        type: String,
        // required: [true, "rasm kiritilishi shart"],
        unique: false /*[false, "full_name unique bo'lishi kerak"]*/,
        minLength: [7, "Kamida 7 ta belgidan iborat bo'lsin"],
    },
    oner_id: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true
    }
},
{
    versionKey: false,
    timestamps: true
}
)

const CotegoriyaSchema = model("Cotegoriya", Cotegoriya)

module.exports = CotegoriyaSchema