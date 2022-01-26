'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reservations',[
      { dateTime:"2021-02-07T15:30:00-08:00",
        partySize:3,
        cartId: 1,
        userId: 1,
        reviewed: true,
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reservations', null, {});
  }
};
