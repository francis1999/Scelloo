/* const { DataTypes } = require("sequelize/types"); */

module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define("Carts", {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DOUBLE
        },
        quantity:{
            type: DataTypes.INTEGER
        },
        customername:{
            type: DataTypes.STRING
        }
       
    })
    return Carts
}