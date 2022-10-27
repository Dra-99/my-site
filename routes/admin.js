const express = require("express")
const router = express.Router();
const { adminLoginHandle, modifyAdminInfoHandle } = require("../services/admin")
const formatResponse = require("../utils/formatResponse")
const { verify } = require("../utils/token")

router.post("/login", async (req, res, next) => {
    // 这里我们还要验证验证码是否正确
    // 。。。。
    const captcha = req.body.captcha;
    if (captcha && req.session.captcha && (captcha.toLowerCase() !== req.session.captcha.toLowerCase())) {
        next(new Error("验证码错误"));
        return;
    }
    // 如果验证正确，进行下一步
    const { userData: adminInfo, token } = await adminLoginHandle(req.body);
    if (adminInfo) {
        res.setHeader("authorization", token);
        res.send(formatResponse(0, undefined, adminInfo))
    } else {
        next(new Error("账号密码错误"))
    }
})

router.get("/whoami", async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const adminInfo = verify(authorization)
        res.send(formatResponse(0, undefined, adminInfo))
    }
})

router.put("/", async (req, res, next) => {
    const result = await modifyAdminInfoHandle(req.body);
    if (result) {
        res.send(formatResponse(0, undefined, result))
    } else {
        next(new Error("旧密码输入不正确"))
    }
})

module.exports = router;