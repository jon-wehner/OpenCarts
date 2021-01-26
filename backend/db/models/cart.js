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
    cuisineId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    stateId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    zipCode: {
      type : DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type : DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.Cuisine, { foreignKey : 'cuisineId'})
    Cart.belongsTo(models.State, { foreignKey : 'stateId'})
  };
  return Cart;
};
