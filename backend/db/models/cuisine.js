'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuisine = sequelize.define('Cuisine', {
    name: {
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len:[3,50]
      }
    }
  }, {});
  Cuisine.associate = function(models) {
    Cuisine.hasMany(models.Cart, {foreignKey: 'cuisineId'})
  };
  return Cuisine;
};
