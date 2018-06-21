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

test('<TabList /> should have the correct aria attributes', () => {
  const tabList = mount((
    <TabList.WrappedComponent selection={mockSelection()}>
      <span>Foo</span>
    </TabList.WrappedComponent>
  ));

  expect(tabList.find('div').prop('role')).toEqual('tablist');
});

test('<TabList /> should be able to set any className', () => {
  const tabList = shallow((
    <TabList.WrappedComponent selection={mockSelection()} className="foo">
      <span>Foo</span>
    </TabList.WrappedComponent>
  ));

  expect(tabList.hasClass('foo')).toBe(true);
});

test('<TabList /> should be set aria-orientation when vertical', () => {
  const selection = mockSelection();
  selection.isVertical = () => true;
  const tabList = mount((
    <TabList.WrappedComponent selection={selection}><span>Foo</span></TabList.WrappedComponent>
  ));

  expect(tabList.find('div').prop('aria-orientation')).toBe('vertical');
});
