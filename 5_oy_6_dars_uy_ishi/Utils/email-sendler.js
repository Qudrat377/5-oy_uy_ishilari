const nodemailer = require("nodemailer")

const sendMessage = async (email, code, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "Assomad377@gmail.com",
                pass: "gdna qmql apjf ejrc"
            }
        })
        return await transporter.sendMail({
            from: "Qudrat",
            to: email,
            subject: "Tasdiqlash uchun",
            html: `<b style="font-size: 30px;"><b style="colour: blue;">${code}</b></b>`,
        })
    } catch (error) {
        next({error, xatolik: "email senderdan"})
    }
}

module.exports = {
    sendMessage
}