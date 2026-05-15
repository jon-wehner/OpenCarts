const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
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
  requireAuth,
  asyncHandler(async (req, res) => {
    const { review, rating, cartId, reservationId } = req.body;
    const reservation = await Reservation.findOne({ where: { id: reservationId } });
    if (!reservation || reservation.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (reservation.cartId !== cartId) {
      return res.status(400).json({ message: 'cartId does not match reservation' });
    }
    const newReview = await Review.create({
      review,
      rating,
      cartId,
      reservationId,
      userId: req.user.id,
    });
    await reservation.update({ reviewed: true });
    return res.json(newReview);
  }),
);

module.exports = router;
