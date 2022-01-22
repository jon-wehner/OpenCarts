module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5219,
  db: {
    uri: process.env.DB_CONNECTION_URI,
    database: process.env.DB_DATABASE,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
