const express = require("express")
const router = express.Router()
const multer = require("multer");
const path = require('path')
const formatResponse = require("../utils/formatResponse")

const storage = multer.diskStorage({
    // 服务端文件存储位置
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public', 'uploads'))
    },
    //上传至服务器后文件名称处理
    filename: function (req, file, cb) {
        const fileName = file.fieldname;
        const randomStr = Math.random().toString(36).slice(-4);
        const extName = path.extname(file.originalname);
        cb(null, fileName + '-' + randomStr + '-' + Date.now() + extName)
    },
})

const upload = multer({
    // dest: path.resolve(__dirname, '../public', 'imgs')
    storage,
    limits: {
        fileSize: 1024 * 1024
    }
})

router.post('/', upload.single('file'), (req, res, next) => {
    const path = `/uploads/${req.file.filename}`;
    res.send(formatResponse(0, '上传成功', path));
})

module.exports = router;