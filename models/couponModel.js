/* const { DataTypes } = require("sequelize/types"); */

module.exports = (sequelize, DataTypes) => {
    const Coupons = sequelize.define("Coupons", {
        couponcode: {
            type: DataTypes.STRING
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