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
            defaultValue:true
        },
        discount: {
            type: DataTypes.DOUBLE,
            defaultValue:false
        },
        item: {
            type: DataTypes.DOUBLE
        },
        percentage: {
            type: DataTypes.DOUBLE,
            defaultValue:false
        },
        discounttype: {
            type: DataTypes.DOUBLE,
        },

    })
    return Coupons
}