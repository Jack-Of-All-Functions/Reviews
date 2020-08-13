import React from 'react';
import axios from 'axios';
import { Grid, jssPreset } from '@material-ui/core';
import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ExpansionPanelActions } from '@material-ui/core';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import App from '../client/src/components/App.jsx';
import Tile from '../client/src/components/Tile.jsx';

configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<Tile />);
})

test(`Should contain the title 'Ratings & Reviews'`, () => {
  const wrapper = shallow(<Tile />);
  expect(wrapper.find('.title').text()).toBe('Ratings & Reviews');
});