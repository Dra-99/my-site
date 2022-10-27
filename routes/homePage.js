const express = require("express")
const router = express.Router()
const { getHomePageData, updateHomePage } = require("../services/homePage")
const formatResponse = require("../utils/formatResponse")

router.get("/", async (req, res, next) => {
    const result = await getHomePageData()
    res.send(formatResponse(0, undefined, result))
})

router.post("/", async (req, res, next) => {
    const result = await updateHomePage(req.body);
    res.send(formatResponse(0, undefined, result));
})

module.exports = router