const express = require("express")
const router = express.Router();
const generateCaptcha = require("../services/captcha")

router.get("/", (req, res, next) => {
    const result = generateCaptcha();
    if (result) {
        req.session.captcha = result.text;
        res.setHeader("Content-Type", "image/svg+xml");
        res.send(result.data)
    } else {
        next(new Error("验证码生成失败"))
    }
})

module.exports = router;