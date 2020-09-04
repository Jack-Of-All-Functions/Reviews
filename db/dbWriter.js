/* eslint-disable no-unused-vars */
const fs = require('fs');

const pool = require('./pool.js');

let fullData = {};
fs.readFile('./db/sampleData/sampleData.json', 'utf8', (err, data) => {
  if (err) throw err;
  fullData = JSON.parse(data);
  console.log(fullData[1]);
  const { characteristics } = fullData[1];
  const charKeys = Object.keys(characteristics);
  for (let j = 1; j <= 3; j += 1) {
    pool.query(`
        INSERT INTO characteristics (char_name) VALUES ('${charKeys[j]}');`,
    (error, res) => {
      if (error) {
        console.log(error);
      }
    });
  }
  for (let i = 1; i <= 100000; i += 1) {
    pool.query(`
    INSERT INTO reviews (
      product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness)
      VALUES (
        ${fullData[i].product_id}, ${fullData[i].rating}, '${fullData[i].summary}', ${fullData[i].recommend}, '${fullData[i].response}', '${fullData[i].body}', '${fullData[i].date}', '${fullData[i].reviewer_name}', ${fullData[i].helpfulness}
        );`,
    (error, res) => {
      if (error) {
        console.log(error);
      }
    });
  }
  for (let i = 1; i <= 100000; i += 1) {
    pool.query(`
      INSERT INTO images (image_url, review_id) VALUES ('${fullData[i].photos[0]}', ${i});`,
    (error, res) => {
      if (error) {
        console.log(error);
      }
    });
    pool.query(`
      INSERT INTO images (image_url, review_id) VALUES ('${fullData[i].photos[1]}', ${i});`,
    (error, res) => {
      if (error) {
        console.log(error);
      }
    });
    for (let k = 0; k < 3; k += 1) {
      const currentChar = charKeys[k];
      pool.query(`
        INSERT INTO reviews_chars (value, review_id, char_id) VALUES ('${fullData[i].characteristics[currentChar].value}', ${i}, ${k + 1});`, (error, res) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }
});
//this is a change
