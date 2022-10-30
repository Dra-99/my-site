const validate = require("validate.js")
const { addBlogType, deleteBlogTypeItem, updateBlogType, getBlogTypeById, getBlogTypeAll } = require("../dao/blogTypeDAO")
const { deleteBlogType } = require("../dao/blogDAO")

exports.addBlogTypeService = async (blogTypeInfo) => {
    const rules = {
        name: {
            type: "string",
            length: {
                maximum: 10
            },
            presence: {
                allowEmpty: false
            }
        },
        order: {
            type: "integer"
        }
    }
    try {
        await validate.async(blogTypeInfo, rules);
        blogTypeInfo.articleCount = 0;
        return await addBlogType(blogTypeInfo)
    } catch (error) {
        throw new Error("数据验证错误");
    }
} 

exports.deleteBlogTypeService = async (id) => {
    const data = await deleteBlogTypeItem(id)
    await deleteBlogType(id);
    return data;
}

exports.updateBlogTypeService = async (id, blogTypeInfo) => {
    return await updateBlogType(id, blogTypeInfo)
}

exports.getBlogTypeByIdService = async (id) => {
    return await getBlogTypeById(id)
}

exports.getBlogTypeAll = async () => {
    return await getBlogTypeAll()
}