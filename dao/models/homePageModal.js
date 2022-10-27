const sequelize = require("../connectDB")
const { DataTypes } = require("sequelize")

const homePage = sequelize.define('homePage', {
    bigImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    midImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    paranoid: true
})

module.exports = homePage;