'use strict';
const seedData = require('../seed_data/cuisines.json')
const names = seedData.cuisines.map(cuisine => cuisine.cuisine.cuisine_name)
module.exports = {
  up: (queryInterface, Sequelize) => {
    const foodTypes = names.map(name => ({ name }))
    return queryInterface.bulkInsert('FoodTypes', foodTypes, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FoodTypes', null, {})
  }
};
