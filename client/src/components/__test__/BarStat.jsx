import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import axios from 'axios';
import { Grid, jssPreset, ExpansionPanelActions } from '@material-ui/core';
import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from '../App.jsx';

describe('Axios get request returns a sorted list', () => {
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

  test('The length of mock review list at results', () => {
    expect(mockReviewsList.results.length).toBe(3);
  });
});
