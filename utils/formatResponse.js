module.exports = (code = 0, msg = "请求成功", data = {}) => {
    return {
        code,
        msg,
        data
    }
}