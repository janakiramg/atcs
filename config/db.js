const Sequelize = require('sequelize');
const AircraftModel = require('../models/aircraft');
const { logger } = require('./winston');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection has been established successfully.');
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });
const Aircraft = AircraftModel(sequelize, Sequelize);
sequelize.sync().then(() => {
  logger.info('Table created!');
});

module.exports = {
  Aircraft
};
