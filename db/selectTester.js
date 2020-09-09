const pool = require('./sampleData/pool.js');

pool.query(`
    SELECT * FROM reviews WHERE product_id = 2;`,
(error, response) => {
  if (error) {
    console.log(error);
  }
  console.log(response.rows);
});
