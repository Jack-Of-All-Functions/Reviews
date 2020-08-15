import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import axios from 'axios';
import { Grid, jssPreset, ExpansionPanelActions } from '@material-ui/core';
import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from '../App.jsx';

jest.mock('axios');

configure({ adapter: new Adapter() });

const mockProducts = [
  {
    id: 1,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140',
  },
  {
    "id": 2,
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69"
  },
  {
    "id": 3,
    "name": "Morning Joggers",
    "slogan": "Make yourself a morning person",
    "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
    "category": "Pants",
    "default_price": "40"
  }
];

const mockReviewsMeta = {
  "product_id": "1",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
  },
  "recommended": {
    0: 5,
    1: 10
  },
  "characteristics": {
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
  }
};

const mockReviewsList = {
  "product": "2",
  "page": 0,
  "count": 100,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": 0,
      "response": "",
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": 0,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
  ]
};

jest.mock('axios', () => ({
  __esModule: true,
  get: jest.fn((url) => {
    if (url.url === 'http://52.26.193.201:3000/products/list') {
      return Promise.resolve({ data: mockProducts });
    }
    if (url.url === 'http://52.26.193.201:3000/reviews/1/meta') {
      return Promise.resolve({ data: mockReviewsMeta });
    }
    if (url.url === 'http://52.26.193.201:3000/reviews/1/list') {
      return Promise.resolve({ data: mockReviewsList });
    }
  }),
  default: jest.fn((url) => {
    if (url.url === 'http://52.26.193.201:3000/products/list') {
      // console.log('GET PRODUCTS URL', url.url)
      return Promise.resolve({ data: mockProducts });
    }
    if (url.url === `http://52.26.193.201:3000/products/1/styles`) {
      // console.log('GET STYLES URL', url.url)
      return Promise.resolve({ data: mockProducts })
    }
    if (url.url === `http://52.26.193.201:3000/reviews/1/meta`) {
      // console.log('GET REVIEWS URL', url.url)
      return Promise.resolve({ data: mockProducts })
    }
  })
}));

describe('Testing for Component Rendering', () => {
  let wrapper;
  let shallow;
  let render;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    render = createRender();
    mount = createMount();
  });

  beforeEach(async () => {
    wrapper = await shallow(<App />);
  });

  test('Header loading properly', () => {
    expect(wrapper.find('#header')).toHaveLength(1);
  });

  test('Announcements loading properly', () => {
    expect(wrapper.find('#announcements')).toHaveLength(1);
  });

  test('Content loading properly', () => {
    expect(wrapper.find('#content')).toHaveLength(1);
  });

});

describe('Testing for API Calls', () => {
  let wrapper;
  let shallow;
  let render;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    render = createRender();
    mount = createMount();
  });

  test('It should receive the products list', async () => {
    let wrapper = await mount(<App />);
    expect(wrapper.state('products')).toEqual(mockProducts);
  })

});
