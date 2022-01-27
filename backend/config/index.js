module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5219,
  db: {
    uri: process.env.DB_CONNECTION_URI,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    testDatabase: process.env.DB_TESTDB,
    testUri: process.env.DB_TESTURI,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
