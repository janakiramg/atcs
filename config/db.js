const Sequelize = require('sequelize');
const AircraftModel = require('../models/aircraft');
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
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const Aircraft = AircraftModel(sequelize, Sequelize);
//{ force: true }
sequelize.sync().then(() => {
  console.log('Tables are created!');
});

module.exports = {
  Aircraft
};
