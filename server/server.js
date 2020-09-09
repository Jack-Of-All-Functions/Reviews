/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const express = require('express');
const axios = require('axios');
const path = require('path');
const pool = require('./sampleData/pool.js');

const app = express();

const PORT = 3003;

const url = 'http://52.26.193.201:3000';

app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/reviews/:product_id/list', (req, res) => {
  const { product_id } = req.params;
  let resp = [];
  pool.query(`
  SELECT * FROM reviews WHERE product_id = ${product_id};`,
  (error, response) => {
    if (error) {
      console.log(error);
    }
    console.log(response.rows);
    resp = response.rows;
  });
  setTimeout(() => {
    res.send(resp);
  }, 500);
});

app.get('/reviews/:product_id/meta', (req, res) => {
  const { product_id } = req.params;
});

app.post('/reviews/:product_id', (req, res) => {
  const { product_id } = req.params;
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
