const adminModel = require("./models/adminModel");
const homePageModal = require("./models/homePageModal")
const blogTypeModal = require("./models/blogTypeModal")
const blogModal = require("./models/blogModal")
const md5 = require("md5");
const sequelize = require("./connectDB");
 
(async () => {

    blogTypeModal.hasMany(blogModal, { foreignKey: 'categoryId', targetKey: 'id' })
    blogModal.belongsTo(blogTypeModal, { foreignKey: 'categoryId', targetKey: 'id', as: "category" })

    sequelize.sync({
        alter: true
    }) 
    console.log("数据库同步完成") 
    const adminCount = await adminModel.count();
    const homePageCount = await homePageModal.count();
    if (!adminCount) { 
        await adminModel.create({ 
            loginId: "admin",
            loginPwd: md5("123456"),
            name: "超级管理员"
        })
        console.log("管理员数据初始化完成")
    }
    if (!homePageCount) {
        await homePageModal.bulkCreate([
            {
                title: "哈哈哈",
                description: "这是哈哈哈哈",
                bigImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668515700&t=99acca0369fd7b5b4f8362115ecf17d6",
                midImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668515700&t=99acca0369fd7b5b4f8362115ecf17d6"
            },
            {
                title: "哈哈哈",
                description: "这是哈哈哈哈",
                bigImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668515700&t=99acca0369fd7b5b4f8362115ecf17d6",
                midImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668515700&t=99acca0369fd7b5b4f8362115ecf17d6"
            },
            {
                title: "哈哈哈",
                description: "这是哈哈哈哈",
                bigImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668515700&t=99acca0369fd7b5b4f8362115ecf17d6",
                midImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668515700&t=99acca0369fd7b5b4f8362115ecf17d6"
            },
        ])
        console.log("首页标题数据初始化完成")
    }
    console.log("数据库数据初始化完成")
})()