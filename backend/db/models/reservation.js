'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    dateTime: DataTypes.DATE,
    partySize: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Reservation.associate = function(models) {
    Reservation.belongsTo(models.Cart, { foreignKey : 'cartId' });
    Reservation.belongsTo(models.User, { foreignKey : 'userId' });
  };
  return Reservation;
};
