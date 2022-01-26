const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const routes = require('./routes');
const environment = require('./config');

const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  // enable cors in development
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  }),
);

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(routes);

app.use((req, res, next) => {
  const err = new Error('The requested resource could not be found.');
  err.title = 'Resource Not Found';
  err.errors = ['The requested resource could not be found.'];
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.titler || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
