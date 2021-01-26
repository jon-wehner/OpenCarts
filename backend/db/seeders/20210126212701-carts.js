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
        zipCode: faker.address.zipCode().slice(0,5),
        imageUrl: faker.image.food()
      }
    }
    const carts = [];
    for (let i = 0; i < 10; i++) {
      carts.push(createCart())
    }
    return queryInterface.bulkInsert('Carts', carts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {})
  }
};
