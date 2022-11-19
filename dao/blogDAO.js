const blogModal = require("./models/blogModal");
const blogTypeModal = require("./models/blogTypeModal")
exports.addBlog = async (blogInfo) => {
    const { dataValues } = await blogModal.create(blogInfo);
    return dataValues;
}

const findBlogByPage = async (categoryId, pagination) => {
    pagination.pageSize = +pagination.pageSize || 10;
    pagination.page = +pagination.page || 1;
    const whereCondition = {};
    if (categoryId && +categoryId !== -1) {
        whereCondition.categoryId = categoryId;
    }
    return await blogModal.findAndCountAll({
        where: whereCondition,
        limit: pagination.pageSize,
        offset: (pagination.page - 1) * pagination.pageSize,
        include: [
            {
                model: blogTypeModal,
                as: 'category'
            }
        ]
    })
}

exports.queryBlogByPage = async (pagination) => {
    const categoryId = pagination.categoryId;
    return findBlogByPage(categoryId, pagination);
}

exports.editBlog = async (blogInfo) => {
    // 修改的内容可以只包含某一字段的修改
    const data = await blogModal.update(blogInfo, {
        where: {
            id: blogInfo.id
        }
    })
    return data[0]
}

exports.queryBlogById = async (id) => {
    return await blogModal.findByPk(id)
}

exports.deleteBlog = async (id) => {
    // 删除文章应该删除文章下的所有评论
    return await blogModal.destroy({
        where: {
            id
        }
    })
}

// 删除文章的分类
exports.deleteBlogType = async (categoryId) => {
    await blogModal.update({ categoryId: null }, {
        where: {
            categoryId
        }
    })
}