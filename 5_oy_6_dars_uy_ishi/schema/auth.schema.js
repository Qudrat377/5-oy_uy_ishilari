const {Schema, model} = require("mongoose")

const Register = new Schema({
    username: {
        type: String,
        required: [true, "username kiritilishi shart"],
        unique: [true, "username avalldan bor"],
        set: value => value.trim(),
        minLength: [2, "Kamida 2 ta harfdan iborat bo'lsin"],
        match: [/^[a-zA-Z]+$/, "faqat harf kiriting"],
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Kamida 8 ta belgidan iborat bo'lsin"],
    },
    role: {
        type: String,
        required: false,
    }
},
{
    versionKey: false,
    timestamps: true
})

const RegisterSchema = model("Users", Register)

module.exports = {
    RegisterSchema
}