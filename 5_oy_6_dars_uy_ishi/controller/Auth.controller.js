const bcrypt = require("bcryptjs")
const CustomErrorHandler = require("../Utils/custom-error-handler")
const { RegisterSchema } = require("../schema/auth.schema")
const { sendMessage } = require("../Utils/email-sendler")
const { tokenGenerator } = require("../Utils/token-generator")

// register

const register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            throw CustomErrorHandler.NotFound("usernmae, email and password are required!")
        }

        const Users = await RegisterSchema.find()

        const foundedEmail = await RegisterSchema.findOne({email: email})

        if (foundedEmail) {
            throw CustomErrorHandler.NotFound("Email alreay exists")
        }

        const foundedUser = await RegisterSchema.findOne({username: username})

        if (foundedUser) {
            throw CustomErrorHandler.NotFound("Username alreay exists")
        }

        const hash = await bcrypt.hash(password, 12)
        const generatedCode = +Array.from({length: 6}, () => 
        Math.ceil(Math.random() * 9)).join("")
        console.log(generatedCode, email);
        

        await sendMessage(email, generatedCode)

        await RegisterSchema.create({
            username,
            email,
            role: "user",
            password: hash
        })
        res.status(201).json({
            message: "Registered"
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            throw CustomErrorHandler.NotFound("email and password are required!")
        }

        const foundedUser = await RegisterSchema.findOne({email: email})
        // console.log(foundedUser);
        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("User not found!")
        }

        const decode = await bcrypt.compare(password, foundedUser.password)

        if (decode) {
            const payload = {
                id: foundedUser._id,
                email: foundedUser.email,
                role: foundedUser.role
            }
            const token = tokenGenerator(payload)

            res.status(200).json({
                message: "Success",
                token
            })
        } else {
            return res.status(401).json({
                message: "Wrong password"
            })
        }
        
    } catch (error) {
        next(error, {xatolik: "loginda xato"})
    }
}

module.exports = {
    register,
    login,
} 