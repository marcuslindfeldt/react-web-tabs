import React from 'react';
import { mount } from 'enzyme';

import { Tab, TabProvider, TabPanel, TabList } from '../';
import { KeyCode } from '../Tab';

test('<TabProvider /> should exist', () => {
  const tabs = mount((
    <TabProvider><p>Foo</p></TabProvider>
  ));

  expect(tabs).toBeDefined();
});

test('<TabProvider /> should select correct tab by default', () => {
  const tabs = mount((
    <TabProvider defaultTab="second">
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(false);
  expect(tabs.find('#first').prop('aria-expanded')).toBe(false);

  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(true);
});

test('<TabProvider /> should update to new tab on click', () => {
  const tabs = mount((
    <TabProvider defaultTab="second">
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  tabs.find('#first-tab').simulate('click');

  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#first').prop('aria-expanded')).toBe(true);

  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(false);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(false);
});

test('<TabProvider /> should call onChange callback on selection', () => {
  const onChange = jest.fn();

  const tabs = mount((
    <TabProvider defaultTab="second" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  tabs.find('#first-tab').simulate('click');

  expect(onChange).toHaveBeenCalledWith('first');
});

test('<TabProvider /> should select correct tab when selected prop updates', () => {
  const onChange = jest.fn();

  const tabs = mount((
    <TabProvider defaultTab="second" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(true);
  tabs.find('#first-tab').simulate('click');
  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#first').prop('aria-expanded')).toBe(true);
  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(false);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(false);
  tabs.setProps({ defaultTab: 'second' });
  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(true);
});

test('<TabProvider /> should not change selection when prop updates to currently selected', () => {
  const onChange = jest.fn();

  const tabs = mount((
    <TabProvider defaultTab="first" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  tabs.find('#second-tab').simulate('click');
  tabs.setProps({ defaultTab: 'second' });
  expect(tabs.find('#second-tab').prop('aria-selected')).toBe(true);
  expect(tabs.find('#second').prop('aria-expanded')).toBe(true);
});

test('<TabProvider /> should shift tab using keyboard navigation', () => {
  const tabs = mount((
    <TabProvider defaultTab="second">
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  tabs.find('#second-tab').simulate('keydown', { keyCode: KeyCode.LEFT_ARROW });
  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(true);
});

test('<TabProvider /> should shift tab using keyboard navigation when vertical', () => {
  const tabs = mount((
    <TabProvider defaultTab="second" vertical>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  tabs.find('#second-tab').simulate('keydown', { keyCode: KeyCode.UP_ARROW });
  expect(tabs.find('#first-tab').prop('aria-selected')).toBe(true);
});

test('<TabProvider /> should set correct aria properties on <TabList> when vertical', () => {
  const tabs = mount((
    <TabProvider defaultTab="second" vertical>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  expect(tabs.find('.rwt__tablist').prop('aria-orientation')).toBe('vertical');
});
