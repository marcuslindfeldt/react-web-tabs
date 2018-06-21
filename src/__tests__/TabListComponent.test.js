import React from 'react';
import { shallow, mount } from 'enzyme';

import TabListComponent from '../TabListComponent';

test('<TabListComponent /> should exist', () => {
  const tabList = shallow((
    <TabListComponent>
      <span>Foo</span>
    </TabListComponent>
  ));

  expect(tabList).toBeDefined();
});

test('<TabListComponent /> should render children', () => {
  const tabList = mount((
    <TabListComponent>
      <span id="content">Foo</span>
    </TabListComponent>
  ));

  expect(tabList.find('#content')).toBeTruthy();
});

test('<TabListComponent /> should have the correct aria attributes', () => {
  const tabList = shallow((
    <TabListComponent>
      <span>Foo</span>
    </TabListComponent>
  ));

  expect(tabList.prop('role')).toEqual('tablist');
});

test('<TabListComponent /> should be able to set any className', () => {
  const tabList = shallow((
    <TabListComponent className="foo">
      <span>Foo</span>
    </TabListComponent>
  ));

  expect(tabList.hasClass('foo')).toBe(true);
});

test('<TabListComponent /> should be set aria-orientation when vertical', () => {
  const tabList = shallow((
    <TabListComponent verticalOrientation><span>Foo</span></TabListComponent>
  ));

  expect(tabList.prop('aria-orientation')).toBe('vertical');
});
