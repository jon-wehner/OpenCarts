'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Reservations',
      'reviewed',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Reservations', 'reviewed')
  }
};
