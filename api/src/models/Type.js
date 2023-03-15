const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('Type', {
        id :{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,

        }
    }, {timestamps: false})
}