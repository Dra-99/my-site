const { queryHomePageData, updateHomePageData } = require("../dao/homePageDAO")
const handleArrData = require("../utils/handleArrData")

exports.getHomePageData = async () => {
    return handleArrData(await queryHomePageData())
}

exports.updateHomePage = async (params) => {
    return handleArrData(await updateHomePageData(params))
}