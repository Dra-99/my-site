const jwt = require("jsonwebtoken")
const md5 = require("md5")

const secret = md5(process.env.JWT_KEY)

exports.sign = (payload, expiresIn) => {
    return jwt.sign(payload, secret, {
        expiresIn
    })
}

exports.verify = (token) => {
    token = handleToken(token)
    return jwt.verify(token, secret)
}

const handleToken = (token) => {
    return token.split(" ")[1]
}