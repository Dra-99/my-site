const adminModel = require("./models/adminModel")

exports.queryAdminData = async (loginInfo) => {
    const data = await adminModel.findOne({
        where: {
            loginId: loginInfo.loginId,
            loginPwd: loginInfo.loginPwd
        },
        attributes: { exclude: ["loginPwd", "deletedAt"] }
    })
    return data
}

exports.updateAdminInfo = async (newAdminInfo) => {
    await adminModel.update(newAdminInfo, {
        where: {
            loginId: newAdminInfo.loginId
        }
    })
    return await this.queryAdminData({
        loginId: newAdminInfo.loginId,
        loginPwd: newAdminInfo.loginPwd
    })
}