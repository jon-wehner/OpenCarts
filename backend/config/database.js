const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
const uri = db.uri;
const testUri = db.testUri;
const testDatabase = db.testDatabase;

module.exports = {
  development: {  
    uri,
    username,
    password,
    host,
    database,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  test: {
    uri: testUri,
    database: testDatabase,
    username,
    password,
    host,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
    dialectOptions : {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  },
};
