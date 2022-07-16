/* const { DataTypes } = require("sequelize/types"); */

module.exports = (sequelize, DataTypes) => {
    const Coupons = sequelize.define("Coupons", {
        couponcode: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        constraints: {
            type: DataTypes.STRING
        },
        is_enabled: {
            type: DataTypes.STRING,
            default:true
        },
        discount: {
            type: DataTypes.DOUBLE
        },

        discountype: {
            type: DataTypes.STRING
        },
    })
    return Coupons
}