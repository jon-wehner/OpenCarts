'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate : {
        min: 1,
        max: 10
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Cart, { foreignKey : 'cartId' });
    Review.belongsTo(models.User, { foreignKey : 'userId' });
  };
  return Review;
};
