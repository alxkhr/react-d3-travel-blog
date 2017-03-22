import React from 'react';
import { shallow } from 'enzyme';
import Blog from '../src/blog';

test('dummy test', () => {
  const component = shallow(<Blog />);
  console.log('blog comp', component.html());
  expect(true).toBe(true);
});
