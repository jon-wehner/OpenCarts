const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const cartsRouter = require('./carts')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/carts', cartsRouter)



module.exports = router;
