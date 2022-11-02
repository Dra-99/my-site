const {
    uploadProject,
    updateProject,
    getProjectItem,
    getAllProjects,
    deleteProjectById
} = require("../dao/projectDAO")
const validate = require("validate.js")

// 上传项目
exports.uploadProjectService = async (projectInfo) => {
    projectInfo.description = JSON.stringify(projectInfo.description);
    const rules = {
        name: {
            type: "string",
            presence: {
                allowEmpty: false
            }
        },
        description: {
            type: "string",
            presence: {
                allowEmpty: false
            }
        },
        github: {
            type: "string",
            presence: {
                allowEmpty: false
            }
        },
        url: {
            type: "string",
            presence: {
                allowEmpty: false
            }
        },
        thumb: {
            type: "string",
            presence: {
                allowEmpty: true
            }
        },
        order: {
            type: "integer",
            presence: {
                allowEmpty: true
            }
        }
    }
    try {
        validate.validate(projectInfo, rules);
        const data = await uploadProject(projectInfo);
        data.description = JSON.parse(data.description);
        return data;
    } catch (error) {
        throw new Error('数据验证失败')
    }
}

// 修改项目
exports.updateProjectService = async (projectInfo) => {
    const data = await getProjectItem(projectInfo.id);
    if (data) {
        projectInfo.description = JSON.stringify(projectInfo.description);
        const result = await updateProject(projectInfo);
        result.description = JSON.parse(result.description);
        return result;
    } else {
        throw new Error("该项目不存在")
    }
}

//获取所有项目
exports.getAllProjectService = async (pagination) => {
    return await getAllProjects(pagination)
}

// 删除项目
exports.deleteProjectService = async (id) => {
    return await deleteProjectById(id)
}