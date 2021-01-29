const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const cartsRouter = require('./carts');
const reservationsRouter = require('./reservations');
const reviewsRouter = require('./reviews');
const asyncHandler = require('express-async-handler');
const { Cuisine, State } = require('../../db/models');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/carts', cartsRouter);

router.use('/reservations', reservationsRouter)

router.use('/reviews', reviewsRouter)



//Get call for states, will probably not be needed but keeping here for now
// router.get('/states',
// asyncHandler(async (req, res) => {
//   const states = await State.findAll();
//   const normalizedStates = {}
//   states.forEach(state => normalizedStates[state.id] = state)
//   res.json(normalizedStates)
// }))



module.exports = router;
