/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const faker = require('faker');
const pool = require('./pool.js');

pool.query(
  `
  DROP TABLE IF EXISTS revschars;
  DROP TABLE IF EXISTS characteristics;
  DROP TABLE IF EXISTS images;
  DROP TABLE IF EXISTS reviews;
  CREATE TABLE reviews (
    review_id serial PRIMARY KEY,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    summary VARCHAR ( 255 ) NOT NULL,
    recommend INT NOT NULL,
    response VARCHAR ( 255 ) NOT NULL,
    body VARCHAR ( 255 ) NOT NULL,
    date VARCHAR ( 255 ) NOT NULL,
    reviewer_name VARCHAR ( 255 ) NOT NULL,
    helpfulness INT NOT NULL
  );
  CREATE TABLE images (
    image_id serial PRIMARY KEY,
    image_url VARCHAR ( 255 ) NOT NULL,
    review_id INT,
    CONSTRAINT fk_review
      FOREIGN KEY(review_id)
        REFERENCES reviews(review_id)
  );
  CREATE TABLE characteristics (
    char_id serial PRIMARY KEY,
    char_name VARCHAR ( 255 ) NOT NULL
  );
  CREATE TABLE revschars (
    rev_char_id serial PRIMARY KEY,
    value VARCHAR ( 255 ) NOT NULL,
    review_id INT,
    char_id INT,
    CONSTRAINT fk_review
      FOREIGN KEY(review_id)
        REFERENCES reviews(review_id),
    CONSTRAINT fk_char
      FOREIGN KEY(char_id)
        REFERENCES characteristics(char_id)
  )`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
  },
);
