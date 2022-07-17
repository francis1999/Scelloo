module.exports = (sequelize, DataTypes) => {
  const Checkouts = sequelize.define('Checkouts', {
    totalprice: {
      type: DataTypes.DOUBLE,
    },
    quantity: {
      type: DataTypes.DOUBLE,
    },
    couponCode: {
      type: DataTypes.STRING,
    },
  })
  Checkouts.associate = (models) => {
    Checkouts.belongsTo(models.Coupons, {
      foreignkey: {
        allowNull: false,
      },
    })
  }
  return Checkouts
}
