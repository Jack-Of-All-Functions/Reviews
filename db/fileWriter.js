/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const faker = require('faker');
const fs = require('fs');
const pool = require('./sampleData/pool.js');

const startTime = Date.now();

const writeObj = (index) => {
  const newReview = {
    product_id: Math.floor(Math.random() * 10),
    review_id: index,
    rating: faker.random.number(),
    summary: faker.company.catchPhrase(),
    recommend: faker.random.number(),
    response: faker.company.catchPhrase(),
    body: faker.company.catchPhrase(),
    date: faker.date.recent(),
    reviewer_name: faker.internet.userName(),
    helpfulness: faker.random.number(),
    photos: [faker.image.people(), faker.image.people()],
    characteristics: {
      Size: {
        id: 14,
        value: `${Math.floor(Math.random() * 5)}.0000`,
      },
      Width: {
        id: 15,
        value: `${Math.floor(Math.random() * 5)}.5000`,
      },
      Comfort: {
        id: 16,
        value: `${Math.floor(Math.random() * 5)}.0000`,
      },
    },
  };
  return newReview;
};

const review = {};

for (let i = 1; i <= 1000000; i += 1) {
  review[i] = writeObj(i);
}
fs.writeFile('./db/sampleData/sampleData.json', JSON.stringify(review), (err) => {
  if (err) return console.log(err);
  return 'bob';
});
