const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const router = express.Router();
const { Reservation } = require('../../db/models');

router.post(
  '/:id(\\d+)/available',
  asyncHandler(async (req, res) => {
    const cartId = parseInt(req.params.id, 10);
    const { dateTime } = req.body;
    // Get end times, 2 hours on either side of the desired time
    const dateObj = new Date(dateTime);
    const hours = dateObj.getHours();
    const minTime = new Date(dateTime).setHours(hours - 2);
    const maxTime = new Date(dateTime).setHours(hours + 2);
    const timeslots = {};
    // Generate time values for each 15 min timeslot within the range
    let i = minTime;
    while (i <= maxTime) {
      i += 900000;
      timeslots[i] = [];
    }
    // Get reservations within time range
    const cartReservations = await Reservation.findAll({
      where: {
        cartId,
        dateTime: {
          [Op.and]: [
            { [Op.gte]: minTime },
            { [Op.lte]: maxTime },
          ],
        },
      },
    });
    // Run through existing reservations and delete any slots with more than 1 existing reservation
    if (cartReservations.length) {
      cartReservations.forEach((reservation) => {
        const dateUnix = Date.parse(reservation.dateTime);
        const reservationTime = timeslots[dateUnix];
        if (reservationTime && reservationTime.length >= 1) {
          delete timeslots[dateUnix];
        } else {
          reservationTime.push(reservation);
        }
      });
    }
    // Map available timeslots into an array and return to front end
    const keys = Object.keys(timeslots);
    const availableTimeslots = keys.map((key) => new Date(parseInt(key, 10)));
    res.json(availableTimeslots);
  }),
);

router.post(
  '/:id(\\d+)/new',
  asyncHandler(async (req, res) => {
    const {
      dateTime,
      partySize,
      userId,
      cartId,
    } = req.body;

    const newRes = await Reservation.create({
      dateTime,
      partySize,
      userId,
      cartId,
    });
    res.json(newRes);
  }),
);

module.exports = router;
