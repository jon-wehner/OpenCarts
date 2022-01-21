'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews',[
      { review:"LOVE THIS PLACE. THE FOOD ABSOLUTELY SLAPS",
        rating: 5,
        cartId: 1,
        userId: 1,
        reservationId: 1,
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
