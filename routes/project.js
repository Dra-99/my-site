const express = require("express")
const router = express.Router()
const {
    uploadProjectService,
    updateProjectService,
    getAllProjectService,
    deleteProjectService
} = require("../services/project")
const formatResponse = require("../utils/formatResponse")

// 新增项目
router.post('/', async (req, res, next) => {
    try {
        const data = await uploadProjectService(req.body);
        res.send(formatResponse(0, '上传成功', data))
    } catch (error) {
        next(new Error(error.message))
    }
})

// 更新项目
router.put("/", async (req, res, next) => {
    try {
        const data = await updateProjectService(req.body)
        res.send(formatResponse(0, '更新成功', data))
    } catch (error) {
        next(new Error(error.message))
    }
})

// 获取所有项目
router.get("/", async (req, res, next) => {
    const data = await getAllProjectService(req.query);
    res.send(formatResponse(0, '获取成功', data))
})

// 删除项目
router.delete("/:id", async (req, res, next) => {
    const data = await deleteProjectService(req.params.id);
    if (data) {
        res.send(formatResponse(0, '删除成功', {}))
    } else {
        next(new Error("该项目不存在"))
    }
})

module.exports = router;