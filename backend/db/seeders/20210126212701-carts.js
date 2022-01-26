/* eslint-disable no-unused-vars */
const faker = require('faker');
const seedData = require('../seed_data/cartImages.json')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cartImages = seedData.urls;    
    const createCart = () => ({
      name: faker.lorem.slug(),
      address: faker.address.streetAddress(),
      priceLevel: Math.ceil(Math.random() * 4),
      cuisineId: Math.ceil(Math.random() * 105),
      city: faker.address.city(),
      stateId: Math.ceil(Math.random() * 51),
      zipCode: faker.address.zipCode().slice(0, 5),
      imageUrl: cartImages[Math.floor(Math.random() * 19)],
    });
    const carts = [];
    for (let i = 0; i < 20; i += 1) {
      carts.push(createCart());
    }
    return queryInterface.bulkInsert('Carts', carts, {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Carts', null, {}),
};
