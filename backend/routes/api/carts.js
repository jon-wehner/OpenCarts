const express = require('express');
const { Op } = require('sequelize');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Cart, State, Cuisine } = require('../../db/models');

// get all carts
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const carts = await Cart.findAll({ include: [State, Cuisine] });
    carts.sort((a, b) => (a.id - b.id))
    res.json(carts);
  })
);

// search for carts
router.post(
  '/',
  asyncHandler(async (req, res) => {
    let { query } = req.body;
    query = query.trim();
    // TODO: Investigate cleaner implementations for these queries
    const cuisines = await Cuisine.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });
    const cuisineIds = cuisines.map((cuisine) => cuisine.id);
    const carts = await Cart.findAll({
      where: {
        [Op.or]: [
          {
            name: { [Op.iLike]: `%${query}%` },
          },
          { cuisineId: { [Op.or]: [...cuisineIds] } },
        ],
      },
      include: [State, Cuisine],
    });    
    res.json(carts);
  })
);

module.exports = router;
