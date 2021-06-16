'use strict';
const faker = require('faker');
const createClient = require('pexels').createClient;
const pexelsApiKey = process.env.PEXELS_API_KEY;

const client = createClient(pexelsApiKey);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cartImages = [];
    const populateImages = async () => {
      const res = await client.photos.search({ query: 'food truck', per_page: 30 });
      res.photos.forEach((photo) => cartImages.push(photo.src.medium));
    };
    await populateImages();
    const createCart = () => {
      return {
        name: faker.lorem.slug(),
        address: faker.address.streetAddress(),
        priceLevel: Math.ceil(Math.random() * 4),
        cuisineId: Math.ceil(Math.random() * 105),
        city: faker.address.city(),
        stateId: Math.ceil(Math.random() * 51),
        zipCode: faker.address.zipCode().slice(0, 5),
        imageUrl: cartImages[Math.ceil(Math.random() * 30)],
      };
    };
    const carts = [];
    for (let i = 0; i < 20; i++) {
      carts.push(createCart());
    }
    return queryInterface.bulkInsert('Carts', carts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {});
  },
};
