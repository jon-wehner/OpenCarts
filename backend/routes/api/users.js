const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, Reservation, Cart } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide a username longer than 4 charachters.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];
// signup
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });
    await setTokenCookie(res, user);
    return res.json({
      user,
    });
  }),
);
// get a user's upcoming reservations
// TODO: This Route should get all of a user's reservations, divided by present and future
router.get(
  '/:id(\\d+)/reservations/future',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userReservations = await Reservation.findAll({
      where: {
        userId,
        dateTime: {
          [Op.gte]: Date.now(),
        },
      },
      include: [Cart],
    });
    if (userReservations.length) {
      res.json(userReservations);
    } else {
      res.send('No Reservations found for user');
    }
  }),
);

module.exports = router;
