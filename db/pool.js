const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: '1010220pP!',
  port: 5432,
});
module.exports = pool;
