'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodType = sequelize.define('FoodType', {
    name: {
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len:[3,50]
      }
    }
  }, {});
  FoodType.associate = function(models) {
    FoodType.hasMany(models.Cart, {foreignKey: 'foodTypeId'})
  };
  return FoodType;
};
