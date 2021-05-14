const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const cartsRouter = require('./carts');
const reservationsRouter = require('./reservations');
const reviewsRouter = require('./reviews');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/carts', cartsRouter);

router.use('/reservations', reservationsRouter);

router.use('/reviews', reviewsRouter);

module.exports = router;
