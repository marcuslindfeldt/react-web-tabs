import React from 'react';
import { shallow, mount } from 'enzyme';

import TabList from '../TabList';


test('<TabList /> should exist', () => {
  const tabList = shallow((
    <TabList><span>Foo</span></TabList>
  ));

  expect(tabList).toBeDefined();
});

test('<TabList /> should render children', () => {
  const tabList = mount((
    <TabList><span id="content">Foo</span></TabList>
  ));

  expect(tabList.find('#content')).toBeTruthy();
});

test('<TabList /> should have the correct aria attributes', () => {
  const tabList = shallow((
    <TabList><span>Foo</span></TabList>
  ));

  expect(tabList.prop('role')).toEqual('tablist');
});

test('<TabList /> should be able to set any className', () => {
  const tabList = shallow((
    <TabList className="foo"><span>Foo</span></TabList>
  ));

  expect(tabList.hasClass('foo')).toBe(true);
});

test('<TabList /> should be set aria-orientation when vertical', () => {
  const tabList = shallow((
    <TabList vertical><span>Foo</span></TabList>
  ));

  expect(tabList.prop('aria-orientation')).toBe('vertical');
});
