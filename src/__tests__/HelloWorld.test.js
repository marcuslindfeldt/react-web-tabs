import React from 'react';
import { shallow } from 'enzyme';
import HelloWorld from '../HelloWorld';

test('<HelloWorld />', () => {
  const wrapper = shallow(<HelloWorld />);

  expect(wrapper).toBeDefined();
});
