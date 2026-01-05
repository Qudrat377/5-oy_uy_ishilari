const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../Utils/custom-error-handler");
const bcrypt = require("bcryptjs")
const emailSender = require("../Utils/email-sender");
const { accessToken, refreshToken } = require("../Utils/token-generator");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const rendomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const time = Date.now() + 120000;

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: rendomNumbers,
      otptime: time,
    });

    await emailSender(rendomNumbers, email);

    console.log(rendomNumbers, email);

    res.status(201).json({
      message: "Registered!",
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
    try {
        const {email, otp} = req.body

        const foundedUser = await AuthSchema.findOne({email})

        if (!foundedUser) {
            throw CustomErrorHandler.UnAuthorized("User not found")
        }

        const time = Date.now()

        if (foundedUser.otptime < time) {
            throw CustomErrorHandler.BadRequset("Otp time expired")
        }

        if (foundedUser.otp !== otp) {
            throw CustomErrorHandler.BadRequset("Wrong verification code")
        }

        await AuthSchema.findByIdAndUpdate(foundedUser._id, {
            isVerified: true
        })

        const payload = {
            username: foundedUser.username,
            email: foundedUser.email,
            role: foundedUser.role,
            id: foundedUser._id
        }
        const access_Token = accessToken(payload)
        const refresh_Token = refreshToken(payload)

        res.cookie("access_token", access_Token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15
        })
        res.cookie("refresh_token", refresh_Token, {
            httpOnly: true,
            maxAge: 3600 * 1000 * 24 * 15
        })

        res.status(200).json({
            message: "Success",
            access_Token
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const foundedUser = await AuthSchema.findOne({email})

        if (!foundedUser) {
            throw CustomErrorHandler.UnAuthorized("User not found")
        }

        const compare = await bcrypt.compare(password, foundedUser.password)

        if (compare && foundedUser.isVerified) {
            const payload = {
                username: foundedUser.username,
                email: foundedUser.email,
                role: foundedUser.role,
                id: foundedUser._id,
            }
            const access_Token = accessToken(payload)
            const refresh_Token = refreshToken(payload)

            res.cookie("access_token", access_Token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 15
            })
            res.cookie("refresh_token", refresh_Token, {
                httpOnly: true,
                maxAge: 3600 * 1000 * 24 * 15
            })
            
            res.status(200).json({
                message: "Success",
                access_Token
            })
        } else {
            throw CustomErrorHandler.UnAuthorized("Invalid password")
        }
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
    } catch (error) {
        next(error)
    }
}


const resendOtp = async (req, res, next) => {
    try {
        const {email} = req.body

        const user = await AuthSchema.findOne({email})

        if (!user) {
            throw CustomErrorHandler.UnAuthorized("User not found")
        }

        const rendomNumber = Array.from({length: 6}, () => Math.floor(
            Math.random() * 10
        )).join("")

        const time = Date.now() + 120000

        await AuthSchema.findByIdAndUpdate(user._id, {
            otp: rendomNumber,
            otptime: time
        })

        await emailSender(rendomNumber, email)
        console.log(rendomNumber, email);

        res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const {email, otp, new_password} = req.body

        const foundedUser = await AuthSchema.findOne({email})

        if (!foundedUser) {
            throw CustomErrorHandler.UnAuthorized("User not found")
        }

        const time = Date.now()

        if (foundedUser.otptime < time) {
           throw CustomErrorHandler.BadRequset("Otp time expired") 
        }

        if (foundedUser.otp !== otp) {
            throw CustomErrorHandler.BadRequset("Wrong verification code")
        }

        const hashPassword = await bcrypt.hash(new_password, 12)

        foundedUser.password = hashPassword

        await AuthSchema.findByIdAndUpdate(foundedUser._id, {password: hashPassword})
        
        res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    verify,
    login,
    logout,
    resendOtp,
    forgotPassword,
}