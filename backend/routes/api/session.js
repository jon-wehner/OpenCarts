const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');


//Login Route
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { credential, password } =req.body;

    const user = await User.login({ credential, password });

    if(!user) {
      const err = new Error('Login Failed');
      err.status = 401;
      err.title = 'Login failed'
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);
//Logout
router.delete(
  '/',
  (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

//Restore Session User
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router
