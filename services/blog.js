const validate = require("validate.js")
const { getBlogTypeById, changeBlogTypeCount } = require("../dao/blogTypeDAO")
const { addBlog, queryBlogByPage, editBlog, queryBlogById, deleteBlog } = require("../dao/blogDAO")

validate.validators.categoryIdIsExist = async (value) => {
    if (!value) return;
    if (value) {
        const blogTypeInfo = await getBlogTypeById(value);
        if (blogTypeInfo) {
            return;
        } else {
            return "the categoryId is not found"
        }
    }
}

exports.addBlogService = async (blogInfo) => {
    // 处理TOC
    blogInfo.toc = JSON.stringify(["a", "b"]);
    blogInfo.scanNumber = 0;
    blogInfo.commentNumber = 0;
    const rules = {
        title: {
            presence: {
                allowEmpty: false
            },
            type: 'string'
        },
        description: {
            type: 'string'
        },
        createDate: {
            presence: {
                allowEmpty: false
            },
            type: 'string'
        },
        categoryId: {
            type: 'integer',
            categoryIdIsExist: true
        },
        htmlContent: {
            type: 'string',
            presence: {
                allowEmpty: false
            }
        },
        thumb: {
            type: 'string'
        },
    }

    try {
        await validate.async(blogInfo, rules);
        const data = await addBlog(blogInfo)
        const categoryId = blogInfo.categoryId;
        if (categoryId) {
            await changeBlogTypeCount(categoryId);
        }
        return data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}

// 分页获取文章
exports.queryBlogByPageService = async (pagination) => {
    return await queryBlogByPage(pagination)
}

// 修改文章
exports.editBlogService = async (blogInfo) => {
    const data = await editBlog(blogInfo)
    if (data) {
        return await queryBlogById(blogInfo.id);
    } else {
        return false
    }
}

// 获取单篇文章
exports.getBlogById = async (id) => {
    return await queryBlogById(id)
}

// 删除文章
exports.deleteBlogService = async (id) => {
    return await deleteBlog(id)
}