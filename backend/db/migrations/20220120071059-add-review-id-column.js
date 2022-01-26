'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    return queryInterface.addColumn(
      'Reviews',
      'reservationId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Reservations', key: 'id'},

      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Reviews', 'reservationId')
  }
};
