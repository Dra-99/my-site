const svgCaptcha = require("svg-captcha")

const generateCaptcha = () => {
    const captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: "il10oO",
        noise: 4,
        color: true,
        background: "#ccc"
    })
    return captcha;
}

module.exports = generateCaptcha;