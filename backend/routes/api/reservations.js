const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Cart, Reservation } = require('../../db/models');
const { Op } = require('sequelize');




router.post(
  '/reservations/1',
  asyncHandler(async (req, res) => {
    console.log(req.body)
    const cartId  = req.params.cartId
    const { dateTime }  = req.body
    const minTime = dateTime - 7.2e+6;
    const maxTime = dateTime + 7.2e+6;
    const availableTimeSlots = {}
    let i = minTime
    while (i <= maxTime) {
      i += 900000;
      timeSlots.i = [];
    }
    const cartReservations = await Reservation.findAll({
      where: {
        cartId,
        dateTime:{
          [Op.and]: [
            { [Op.gte]: minTime },
            { [Op.lte] : maxTime }
          ]
        },
      },
    })
    cartReservations.forEach(reservation => {
      const reservationTime = availableTimeslots[reservation.dateTime]
      if (reservationTime.length >= 1) {
        delete reservationTime
      } else {
        reservationTime.push(reservation)
      }
    })
    res.json(availableTimeSlots)
  })
)














module.exports = router
