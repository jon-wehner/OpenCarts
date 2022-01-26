'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    dateTime: DataTypes.DATE,
    partySize: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reviewed: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  }, {});
  Reservation.associate = function(models) {
    Reservation.belongsTo(models.Cart, { foreignKey : 'cartId' });
    Reservation.belongsTo(models.User, { foreignKey : 'userId' });
    Reservation.hasOne(models.Review, { foreignKey : 'reservationId'});
  };
  return Reservation;
};
