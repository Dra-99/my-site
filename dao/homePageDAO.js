const homePageModal = require("./models/homePageModal")

exports.queryHomePageData = async () => {
    return await homePageModal.findAll();
}

exports.updateHomePageData = async (params) => {
    await homePageModal.update(params, {
        where: {
            id: params.id
        }
    })
    return await homePageModal.findAll()
}