'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 4,
      }
    },
    foodTypeId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    stateId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    zipcode: {
      type : DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};
