/* eslint-disable */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const Review = new mongoose.Schema(
  'Review', {
  review_id: Number,
  rating: Number,
  summary: String,
  recommend: Number,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [String],
  characteristics: {},
},
);

const review = new Review(
  {
    review_id: 5,
    rating: 3,
    summary: `I'm enjoying wearing these shades`,
    recommend: 0,
    response: ``,
    body: `Comfortable and practical.`,
    date: `2019-04-14T00:00:00.000Z`,
    reviewer_name: `shortandsweeet`,
    helpfulness: 5,
    photos: [`urlplaceholder/review_5_photo_number_1.jpg`,`urlplaceholder/review_5_photo_number_2.jpg`],
    characteristics: {
      "Size": {
        "id": 14,
        "value": "4.0000"
      },
      "Width": {
        "id": 15,
        "value": "3.5000"
      },
      "Comfort": {
        "id": 16,
        "value": "4.0000"
      },
  },
})

review.save().then(() => console.log('meow'));