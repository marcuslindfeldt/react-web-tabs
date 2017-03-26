import React from 'react';
import { mount } from 'enzyme';

import { Tab, Tabs, TabPanel, TabList } from '../';

test('<Tabs /> should exist', () => {
  const tabs = mount((
    <Tabs><p>Foo</p></Tabs>
  ));

  expect(tabs).toBeDefined();
});

test('<Tabs /> should select correct tab by default', () => {
  const tabs = mount((
    <Tabs defaultTab="second">
      <TabList>
        <Tab tabFor="first"><span>Tab 1</span></Tab>
        <Tab tabFor="second"><span>Tab 2</span></Tab>
      </TabList>
      <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
      <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
    </Tabs>
  ));

  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(false);
  expect(tabs.find('#first-tab').prop('aria-expanded')).toBe(false);
  expect(tabs.find('#first').prop('aria-expanded')).toBe(false);

  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#second-tab').prop('aria-expanded')).toBe(true);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(true);
});

test('<Tabs /> should update to new tab on click', () => {
  const tabs = mount((
    <Tabs defaultTab="second">
      <TabList>
        <Tab tabFor="first"><span>Tab 1</span></Tab>
        <Tab tabFor="second"><span>Tab 2</span></Tab>
      </TabList>
      <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
      <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
    </Tabs>
  ));

  tabs.find('#first-tab').simulate('click');

  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#first-tab').prop('aria-expanded')).toBe(true);
  expect(tabs.find('#first').prop('aria-expanded')).toBe(true);

  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(false);
  expect(tabs.find('#second-tab').prop('aria-expanded')).toBe(false);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(false);
});

test('<Tabs /> should call onChange callback on selection', () => {
  const onChange = jest.fn();

  const tabs = mount((
    <Tabs defaultTab="second" onChange={onChange}>
      <TabList>
        <Tab tabFor="first"><span>Tab 1</span></Tab>
        <Tab tabFor="second"><span>Tab 2</span></Tab>
      </TabList>
      <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
      <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
    </Tabs>
  ));

  tabs.find('#first-tab').simulate('click');

  expect(onChange).toHaveBeenCalledWith('first');
});

test('<Tabs /> should select correct tab when selected prop updates', () => {
  const onChange = jest.fn();

  const tabs = mount((
    <Tabs defaultTab="second" onChange={onChange}>
      <TabList>
        <Tab tabFor="first"><span>Tab 1</span></Tab>
        <Tab tabFor="second"><span>Tab 2</span></Tab>
      </TabList>
      <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
      <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
    </Tabs>
  ));

  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#second-tab').prop('aria-expanded')).toBe(true);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(true);
  tabs.find('#first-tab').simulate('click');
  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#first-tab').prop('aria-expanded')).toBe(true);
  expect(tabs.find('#first').prop('aria-expanded')).toBe(true);
  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(false);
  expect(tabs.find('#second-tab').prop('aria-expanded')).toBe(false);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(false);
  tabs.setProps({ defaultTab: 'second' });
  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#second-tab').prop('aria-expanded')).toBe(true);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(true);
});
