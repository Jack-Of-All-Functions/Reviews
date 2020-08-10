import React from 'react';
import App from '../client/src/components/App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<App />);
})

test(`Should contain the title 'Ratings & Reviews'`, () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.title').text()).toBe('Ratings & Reviews');
});