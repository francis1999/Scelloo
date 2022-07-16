/* const { DataTypes } = require("sequelize/types"); */

module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define("Carts", {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DOUBLE
        },

        totalprice: {
            type: DataTypes.DOUBLE
        },
    })
    Carts.associate = models => {
        Carts.belongsTo(models.Coupons, {
            foreignkey: {
                allowNull: false
            }
        });
    }
    return Carts
}