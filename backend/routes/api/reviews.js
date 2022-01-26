const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Reservation } = require('../../db/models');

const router = express.Router();

// Get reviews for one cart
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

// Create a new review
router.post(
  '/',
  asyncHandler(async (req, res) => {    
    const { reservationId } = req.body.testReview;
    const data = req.body.testReview;
    const review = await Review.create(data)
    const reservation = await Reservation.findOne({ where: {id: reservationId}});

    await reservation.update({ reviewed: true })

    res.json(review)
  })
)

module.exports = router;
