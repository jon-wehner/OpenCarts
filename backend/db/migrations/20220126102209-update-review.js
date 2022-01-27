'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint(
      'Reviews',
      {
        fields: ['reservationId'],
        type: 'unique',
        name: 'one_review_per_reservation'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint(
      'Reviews',
      'one_review_per_reservation'
    )
  }
};
