const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.TEST_DB_URL,
});

module.exports = pool;
