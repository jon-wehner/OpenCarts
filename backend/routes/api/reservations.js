const express = require('express');
const asynchHandler = require('express-async-handler');
const router = express.Router();




router.get(
  '/reservations/:cartId',
  asynchHandler(async (req, res) => {
    const { cartId } = req.params
    const { dateTime } = req.body
  })
)














module.exports = router
