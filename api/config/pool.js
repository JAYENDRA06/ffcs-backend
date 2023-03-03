const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'jayendra',
  host: 'localhost',
  database: 'ffcs',
  password: process.env.DB_PASS,
  port: 5432, // default PostgreSQL port
});

module.exports = pool;