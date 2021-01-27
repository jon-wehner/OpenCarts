const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const cartsRouter = require('./carts')
const asyncHandler = require('express-async-handler');
const { Cuisine, State } = require('../../db/models');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/carts', cartsRouter)

router.get('/states',
asyncHandler(async (req, res) => {
  const states = await State.findAll();
  const normalizedStates = {}
  states.forEach(state => normalizedStates[state.id] = state)
  res.json(normalizedStates)
}))



module.exports = router;
