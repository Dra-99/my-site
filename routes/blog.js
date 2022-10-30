const express = require('express')
const router = express.Router()
const { addBlogService, queryBlogByPageService, editBlogService, getBlogById, deleteBlogService } = require("../services/blog")
const formatResponse = require("../utils/formatResponse")

// 添加文章
router.post("/", async (req, res, next) => {
    try {
        const data = await addBlogService(req.body)
        res.send(formatResponse(0, "添加成功", data));
    } catch (error) {
        next(error)
    }
})

// 分页获取文章
router.get("/", async (req, res, next) => {
    const data = await queryBlogByPageService(req.query);
    res.send(formatResponse(0, "获取成功", data))
})

// 修改文章
router.put("/", async (req, res, next) => {
    const data = await editBlogService(req.body)
    if (data) {
        res.send(formatResponse(0, '修改成功', data));
    } else {
        next(new Error('文章id不存在'))
    }
})

// 获取单篇文章
router.get("/:id", async (req, res, next) => {
    const data = await getBlogById(req.params.id)
    res.send(formatResponse(0, '获取成功', data));
})

// 删除文章
router.delete("/:id", async (req, res, next) => {
    const data = await deleteBlogService(req.params.id);
    if (data) {
        res.send(formatResponse(0, '删除成功', {}))
    } else {
        next(new Error("文章id不存在"))
    }
})

module.exports = router