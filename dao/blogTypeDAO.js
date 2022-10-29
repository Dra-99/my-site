const blogTypeModal = require("./models/blogTypeModal")

exports.addBlogType = async (blogTypeInfo) => {
    return await blogTypeModal.create(blogTypeInfo)
}

exports.deleteBlogTypeItem = async (id) => {
    /**TODO 删除分类成功之后，该分类下的文章类型也要删除 */ 
    return await blogTypeModal.destroy({
        where: {
            id: id
        }
    })
}

exports.updateBlogType = async (id, blogTypeInfo) => {
    await blogTypeModal.update(blogTypeInfo, {
        where: {
            id
        }
    })
    return await blogTypeModal.findByPk(id);
}

exports.getBlogTypeById = async (id) => {
    return await blogTypeModal.findByPk(id);
}

exports.getBlogTypeAll = async () => {
    return await blogTypeModal.findAll({
        order: [
            ["order"]
        ]
    })
}