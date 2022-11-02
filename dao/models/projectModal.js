const sequelize = require("../connectDB")
const { DataTypes } = require("sequelize")

const project = sequelize.define('project', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    github: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumb: {
        type: DataTypes.STRING
    },
    order: {
        type: DataTypes.INTEGER
    }
}, {
    paranoid: true
})

module.exports = project;