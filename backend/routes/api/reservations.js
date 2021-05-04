const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Cart, Reservation } = require('../../db/models');
const { Op } = require('sequelize');

router.post(
  '/:id(\\d+)/available',
  asyncHandler(async (req, res) => {
    const cartId  = parseInt(req.params.id, 10)
    const { dateTime }  = req.body

    const dateObj = new Date(dateTime)
    const hours = dateObj.getHours()
    const minTime = new Date(dateTime).setHours(hours-2)
    const maxTime = new Date(dateTime).setHours(hours+2)
    const timeslots = {}

    let i = minTime
    while (i <= maxTime) {
      i += 900000;
      timeslots[i] = [];
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
    });
    if (cartReservations.length) {
      for (let reservation of cartReservations) {
        const dateUnix = Date.parse(reservation.dateTime)
        const reservationTime = timeslots[dateUnix]
        if (reservationTime && reservationTime.length >= 1) {
          delete timeslots[dateUnix]
          break
        } else {
          reservationTime.push(reservation)
        }
      }
    }
    const keys = Object.keys(timeslots)
    const availableTimeslots= keys.map(key => new Date(parseInt(key, 10)))
    res.json(availableTimeslots)
  })
)

router.post(
  '/:id(\\d+)/new',
  asyncHandler(async (req, res) => {
    const {dateTime,
      partySize,
      userId,
      cartId} = req.body

    const newRes = await Reservation.create({
      dateTime,
      partySize,
      userId,
      cartId
    })
    res.json(newRes)
  })
)













module.exports = router
