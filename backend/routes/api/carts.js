const express = require('express');
const asynchHandler = require('express-async-handler');
const router = express.Router();
const { Cart, State, Cuisine } = require('../../db/models')
const { Op } = require('sequelize');



router.get(
  '/',
  asynchHandler(async (req, res) => {
    const carts = await Cart.findAll({ include: [State, Cuisine]});
    const normalizedCarts = {}
    carts.forEach(cart => normalizedCarts[cart.id] = cart)
    res.json(normalizedCarts);
}));

router.post(
  '/',
  asynchHandler(async (req, res) => {
    const { query } = req.body
    const cuisines = await Cuisine.findAll({
      where: {
        name: {
        [Op.iLike]: `%${query}%`
      }},
    });
    const cuisineIds = cuisines.map(cuisine=> cuisine.id)
    const carts = await Cart.findAll({
      where: {
        [Op.or]: [
          { name:
            { [Op.iLike]: `%${query}%`}
          },
          {cuisineId: {
            [Op.or]: [...cuisineIds]}}]
      },
    });
    res.json(carts)
  })
);


module.exports = router;
