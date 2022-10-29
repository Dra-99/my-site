const sequelize = require("../connectDB")
const { DataTypes } = require("sequelize")

const blogType = sequelize.define("blogType", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    articleCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    order: {
        type: DataTypes.INTEGER,
    }
}, {
    paranoid: true
})

module.exports = blogType;