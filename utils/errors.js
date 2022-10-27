const formatResponse = require("./formatResponse")

// 错误处理基类
class ServerError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    errorResp() {
        return formatResponse(this.code, this.message, null)
    }
}

exports.UploadError = class extends ServerError {
    constructor(message) {
        super(message, 413)
    }
}

exports.ForbiddenError = class extends ServerError {
    constructor(message) {
        super(message, 401)
    }
}

exports.ValidationError = class extends ServerError {
    constructor(message) {
        super(message, 406)
    }
}

exports.NotSourceError = class extends ServerError {
    constructor(message) {
        super('not found source', 404)
    }
}

exports.UnknownError = class extends ServerError {
    constructor() {
        super('server inner error', 500)
    }
}

exports.OtherError = class extends ServerError {
    constructor(message) {
        super(message, 99)
    }
}

exports.ServerError = ServerError

exports.handleOtherError = (err) => {
    if (err instanceof Error) {
        return new this.OtherError(err.message).errorResp()
    }
    return new this.UnknownError().errorResp()
}