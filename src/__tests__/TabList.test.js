import React from 'react';
import { shallow, mount } from 'enzyme';

import TabList from '../TabList';

const mockSelection = () => ({
  isVertical: jest.fn(),
});

test('<TabList /> should exist', () => {
  const tabList = shallow((
    <TabList.WrappedComponent selection={mockSelection()}>
      <span>Foo</span>
    </TabList.WrappedComponent>
  ));

  expect(tabList).toBeDefined();
});

test('<TabList /> should render children', () => {
  const tabList = mount((
    <TabList.WrappedComponent selection={mockSelection()}>
      <span id="content">Foo</span>
    </TabList.WrappedComponent>
  ));

  expect(tabList.find('#content')).toBeTruthy();
});
