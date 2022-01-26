'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Reservations',
      'reviewed',
      {
        type: Sequelize.BOOLEAN,
        default: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColum('Reservations', 'reviewed')
  }
};
