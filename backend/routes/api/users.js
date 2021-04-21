const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, requireauth } = require('../../utils/auth');
const { User } = require('../../db/models');
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
]
//signup
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

module.exports = router
