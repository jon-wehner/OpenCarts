'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
    const seedStates = states.map(state => ({ name : state }))
    return queryInterface.bulkInsert('States',seedStates,{});
  },



  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('States', null, {});
  }
};
