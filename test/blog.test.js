import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Blog from '../src/blog';

test('dummy test', () => {
  const component = shallow(<Router><Blog /></Router>);
  console.log('blog comp', component.html());
  expect(true).toBe(true);
});
