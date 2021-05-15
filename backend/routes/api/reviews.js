const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models');

const router = express.Router();

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const cartId = req.params.id;
    const reviews = await Review.findAll({
      where: {
        cartId,
      },
    });
    res.json(reviews);
  }),
);

module.exports = router;
