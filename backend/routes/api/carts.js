const express = require('express');
const asynchHandler = require('express-async-handler')
const router = express.Router();
const { Cart, State, Cuisine } = require('../../db/models')



router.get('/',
asynchHandler(async (req, res) => {
  const carts = await Cart.findAll({ include: [State, Cuisine]});
  const normalizedCarts = {}
  carts.forEach(cart => normalizedCarts[cart.id] = cart)
  res.json(normalizedCarts);
}))


module.exports = router;
