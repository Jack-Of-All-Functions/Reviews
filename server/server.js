const express = require('express');

const app = express();
const path = require('path');

const PORT = 3003;
const db = require('../db/index.js');

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
  res.send(db.list(product_id));
});

app.get('/reviews/:product_id/meta', (req, res) => {
  const { product_id } = req.params;
  res.send(db.meta(product_id));
});

app.get('/reviews/:product_id', (req, res) => {
  const { product_id } = req.params;

  res.send(db.post(product_id));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
