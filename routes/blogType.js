const express = require('express')
const router = express.Router()
const { addBlogTypeService, deleteBlogTypeService, updateBlogTypeService, getBlogTypeByIdService, getBlogTypeAll } = require("../services/blogType")
const formatResponse = require("../utils/formatResponse")
const handleArrData = require("../utils/handleArrData")

// 添加分类
router.post("/", async (req, res, next) => {
    try {
        const { dataValues } = await addBlogTypeService(req.body);
        res.send(formatResponse(0, '添加成功', dataValues))
    } catch (error) {
        next(new Error(error.message))
    }
})

// 获取分类
router.get("/", async (req, res, next) => {
    const data = await getBlogTypeAll();
    const handleData = handleArrData(data);
    res.send(formatResponse(0, '获取成功', handleData))
})

// 获取某个分类
router.get("/:id", async (req, res, next) => {
    const data = await getBlogTypeByIdService(req.params.id)
    if (data) {
        res.send(formatResponse(0, '获取成功', data))
    } else {
        next(new Error('分类不存在'))
    }
})

// 修改分类
router.put("/:id", async (req, res, next) => {
    const data = await updateBlogTypeService(req.params.id, req.body)
    if (data) {
        res.send(formatResponse(0, '更新成功', data))
    } else {
        next(new Error('分类不存在'))
    }
})

// 删除分类
router.delete("/:id", async (req, res, next) => {
    const data = await deleteBlogTypeService(req.params.id);
    if (data) {
        res.send(formatResponse(0, '删除成功', {}))
    } else {
        next(new Error('分类不存在'));
    }
})

module.exports = router