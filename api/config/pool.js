const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new instance of Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'postgres',
  host: 'localhost',
});

module.exports = sequelize;