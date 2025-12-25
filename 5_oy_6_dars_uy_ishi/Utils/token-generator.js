const jwt = require("jsonwebtoken")

const tokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "25m"})
}

module.exports = {
    tokenGenerator
}