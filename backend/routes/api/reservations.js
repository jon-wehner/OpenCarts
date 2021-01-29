const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Cart, Reservation } = require('../../db/models');
const { Op } = require('sequelize');
const { date } = require('faker');




router.post(
  '/:id(\\d+)/available',
  asyncHandler(async (req, res) => {
    const cartId  = parseInt(req.params.id, 10)
    const { dateTime }  = req.body

    const dateObj = new Date(dateTime)
    const hours = dateObj.getHours()
    const minTime = new Date(dateTime).setHours(hours+2)
    console.log(minTime)
    const maxTime = new Date(dateTime).setHours(hours+2)
    console.log(maxTime)
    const availableTimeslots = {}
    let i = minTime
    while (i <= maxTime) {
      i += 900000;
      availableTimeslots[i] = [];
    }
    console.log(availableTimeslots)
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
    // console.log(cartReservations)
    // if (cartReservations.length) {
    //   cartReservations.forEach(reservation => {
    //     const reservationTime = availableTimeslots[reservation[dateTime]]
    //     if (reservationTime.length >= 1) {
    //       delete reservationTime
    //     } else {
    //       reservationTime.push(reservation)
    //     }
    //   })
    // }
    // res.json("hello")
  })
)














module.exports = router
