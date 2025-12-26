const nodemailer = require("nodemailer")
const CustomErrorHandler = require("./custom-error-handler")

module.exports = async function(code, email) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "Assomad377@gmail.com",
                pass: process.env.APP_KEY
            }
        })

        await transporter.sendMail({
            from: "Qudrat",
            to: email,
            subject: "Library verification",
            text: "ushbu xabarda tasdiqlash kod keltirilgan",
            html: `<b>${code}</b>`
        })
    } catch (error) {
        throw CustomErrorHandler.BadRequest(error.message)
    }
}