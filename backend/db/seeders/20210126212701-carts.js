'use strict';
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    const createCart = () => {
      return {
        name: faker.lorem.slug(),
        address: faker.address.streetAddress(),
        priceLevel: Math.ceil((Math.random()*4)),
        cuisineId: Math.ceil((Math.random()*105)),
        city: faker.address.city(),
        stateId: Math.ceil((Math.random()*51)),
        zipcode: faker.address.zipCode()

      }
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
