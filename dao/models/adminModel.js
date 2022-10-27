const sequelize = require("../connectDB")
const { DataTypes } = require("sequelize")

const admin = sequelize.define("admin", {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true
})

module.exports = admin;