const projectModal = require("./models/projectModal")

// 上传项目
exports.uploadProject = async (projectInfo) => {
    return await projectModal.create(projectInfo);
}

// 获取单个项目
exports.getProjectItem = async (id) => {
    return await projectModal.findByPk(id);
}

// 修改项目
exports.updateProject = async (projectInfo) => {
    await projectModal.update(projectInfo, {
        where: {
            id: projectInfo.id
        }
    })
    return await this.getProjectItem(projectInfo.id)
}

// 获取所有项目
exports.getAllProjects = async (pagination) => {
    pagination.pageSize = +pagination.pageSize || 10;
    pagination.page = +pagination.page || 1;
    return await projectModal.findAndCountAll({
        limit: pagination.pageSize,
        offset: (pagination.page - 1) * pagination.pageSize,
    })
}

// 删除项目
exports.deleteProjectById = async (id) => {
    return await projectModal.destroy({
        where: {
            id
        }
    })
}