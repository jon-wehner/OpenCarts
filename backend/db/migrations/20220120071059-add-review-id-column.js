'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'Reviews',
      'resertvationId',
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
