const sequelize = require("../connectDB")
const { DataTypes } = require("sequelize")

const blog = sequelize.define('blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scanNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    commentNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    categoryId: {
        type: DataTypes.INTEGER,
    },
    toc: {  
        type: DataTypes.TEXT
    },
    htmlContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    thumb: {
        type: DataTypes.STRING
    }
})

module.exports = blog;