const md5 = require("md5")
const { queryAdminData, updateAdminInfo } = require("../dao/adminDAO")
const { sign } = require("../utils/token")

exports.adminLoginHandle = async (loginInfo) => {
    loginInfo.loginPwd = md5(loginInfo.loginPwd)
    // 是否是7天免登录
    const remember = loginInfo.remember;
    const result = await queryAdminData(loginInfo)
    let token = '';
    let userData = null;
    if (result && result.dataValues) {
        userData = result.dataValues
        // 用户存在
        token = sign({
            id: userData.id,
            name: userData.name,
            loginId: userData.loginId
        }, 60 * 60 * 24 * (remember ? 7 : 1))
    }
    return {
        userData, 
        token
    } 
}

exports.modifyAdminInfoHandle = async (loginInfo) => {
    const loginParams = {
        loginId: loginInfo.loginId,
        loginPwd: md5(loginInfo.oldLoginPwd)
    }
    const result = await queryAdminData(loginParams);
    console.log(result)
    if (result && result.dataValues) {
        adminInfo = result.dataValues;
        // 旧密码正确
        const updatedInfo = await updateAdminInfo({
            loginId: loginInfo.loginId,
            loginPwd: md5(loginInfo.loginPwd),
            name: loginInfo.name
        });
        return updatedInfo.dataValues
    }
    return null;
}