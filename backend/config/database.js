const config = require('./index');

const db = config.db;
const uri = db.uri;

module.exports = {
  development: {  
    uri,
    dialect: "postgres",
    seederStorage: "sequelize",
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
