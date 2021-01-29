const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Review } = require('../../db/models')
const { Op } = require('sequelize');

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res)  => {
    const cartId = req.params.id;
    const reviews = await Review.findAll({where: {
      cartId: cartId
    }});
    res.json(reviews)
  })
)


module.exports = router
