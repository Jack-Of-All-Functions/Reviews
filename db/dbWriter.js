/* eslint-disable no-unused-vars */
const fs = require('fs');

const now = Date.now();
const pool = require('./pool.js');

let fullData = {};
fs.readFile('./db/sampleData/sampleData.json', 'utf8', async (err, data) => {
  if (err) throw err;
  fullData = JSON.parse(data);
  const { characteristics } = fullData[1];
  const charKeys = Object.keys(characteristics);
  for (let j = 0; j < 3; j += 1) {
    pool.query(`
        INSERT INTO characteristics (char_name) VALUES ('${charKeys[j]}');`,
    (error, res) => {
      if (error) {
        console.log(error);
      }
    });
  }
  const primaryInserter = () => {
    for (let j = 0; j < 10; j += 1) {
      let insertString = '';
      for (let i = 1; i <= 100000; i += 1) {
        if (i === 100000) {
          insertString += `(
            ${fullData[i].product_id}, ${fullData[i].rating}, '${fullData[i].summary}', ${fullData[i].recommend}, '${fullData[i].response}', '${fullData[i].body}', '${fullData[i].date}', '${fullData[i].reviewer_name}', ${fullData[i].helpfulness}
            );`;
        } else {
          insertString += `(
              ${fullData[i].product_id}, ${fullData[i].rating}, '${fullData[i].summary}', ${fullData[i].recommend}, '${fullData[i].response}', '${fullData[i].body}', '${fullData[i].date}', '${fullData[i].reviewer_name}', ${fullData[i].helpfulness}
              ), `;
        }
      }
      console.log(insertString);
      pool.query(`
          INSERT INTO reviews (
            product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness)
            VALUES ${insertString}`,
      (error, res) => {
        if (error) {
          console.log(error);
        }
      });
    }
  };
  const imageInserter = () => {
    for (let j = 0; j < 10; j += 1) {
      let imageString = '';
      for (let i = 1; i <= 100000; i += 1) {
        if (i === 100000) {
          imageString += `('${fullData[i].photos[0]}', ${i}), ('${fullData[i].photos[1]}', ${i});`;
        } else {
          imageString += `('${fullData[i].photos[0]}', ${i}), ('${fullData[i].photos[1]}', ${i}), `;
        }
      }
      pool.query(`
      INSERT INTO images (image_url, review_id) VALUES ${imageString}`,
      (error, res) => {
        if (error) {
          console.log(error);
        }
      });
    }
  };
  const revcharInserter = () => {
    for (let j = 0; j < 10; j += 1) {
      let revcharString = '';
      for (let k = 1; k <= 100000; k += 1) {
        if (k === 100000) {
          revcharString += `('${fullData[k].characteristics[charKeys[0]].value}', ${k}, ${1}), ('${fullData[k].characteristics[charKeys[1]].value}', ${k}, ${2}), ('${fullData[k].characteristics[charKeys[2]].value}', ${k}, ${3});`;
        } else {
          revcharString += `('${fullData[k].characteristics[charKeys[0]].value}', ${k}, ${1}), ('${fullData[k].characteristics[charKeys[1]].value}', ${k}, ${2}), ('${fullData[k].characteristics[charKeys[2]].value}', ${k}, ${3}), `;
        }
      }
      pool.query(`
      INSERT INTO revschars (value, review_id, char_id) VALUES ${revcharString}`,
      (error, res) => {
        if (error) {
          console.log(error);
        }
      });
    }
  };
  primaryInserter();
  setTimeout(() => {
    imageInserter();
    revcharInserter();
  }, 5000);
});
setTimeout(() => {
  console.log((Date.now() - now) / 1000);
}, 1000);
