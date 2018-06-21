import React from 'react';
import { mount } from 'enzyme';

import Tabs from '../Tabs';
import TabProvider from '../TabProvider';

test('<Tabs /> should exist', () => {
  const tabs = mount((
    <Tabs><p>Foo</p></Tabs>
  ));

  expect(tabs).toBeDefined();
});

test('<Tabs /> should have the className rwt__tabs by default', () => {
  const tabs = mount((
    <Tabs><p>Foo</p></Tabs>
  ));

  expect(tabs.find('.rwt__tabs')).toBeDefined();
});

test('<Tabs /> should be able to set any classname', () => {
  const tabs = mount((
    <Tabs className="foo"><p>Foo</p></Tabs>
  ));

  expect(tabs.find('.rwt__tabs')).toBeDefined();
  expect(tabs.find('.foo')).toBeDefined();
});

test('<Tabs /> should render children', () => {
  const tabs = mount((
    <Tabs><p id="child">Foo</p></Tabs>
  ));

  expect(tabs.find('#child')).toBeDefined();
});

test('<Tabs /> should be able to pass vertical prop', () => {
  const tabs = mount((
    <Tabs vertical><p>Foo</p></Tabs>
  ));

  expect(tabs.find('[data-rwt-vertical="true"]')).toBeDefined();
});

test('<Tabs /> should by wrapped by a tabProvider', () => {
  const tabs = mount((
    <Tabs><p>Foo</p></Tabs>
  ));

  expect(tabs.find(TabProvider)).toBeDefined();
});
