import React from 'react';
import { mount } from 'enzyme';
import TabPanel from '../TabPanel';

const mockSelection = () => ({
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  isSelected: jest.fn(),
});

test('<TabPanel /> should exist', () => {
  const tabPanel = mount((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>
  ));

  expect(tabPanel).toBeDefined();
});

test('<TabPanel /> should render children', () => {
  const tabPanel = mount((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo"><span id="content">Foo</span></TabPanel.WrappedComponent>
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
});

test('<TabPanel /> should subscribe and unsubscribe for context changes', () => {
  const selection = mockSelection();

  const tabPanel = mount(
    <TabPanel.WrappedComponent selection={selection} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>,
  );

  expect(selection.subscribe).toHaveBeenCalledTimes(1);
  tabPanel.unmount();
  expect(selection.subscribe).not.toHaveBeenCalledTimes(2);
  expect(selection.unsubscribe).toHaveBeenCalledTimes(1);
});

test('<TabPanel /> should unsubscribe with the same function as subscribed with', () => {
  const selection = mockSelection();

  const tabPanel = mount(
    <TabPanel.WrappedComponent selection={selection} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>,
  );

  tabPanel.unmount();
  const subscribeArgs = selection.subscribe.mock.calls[0];
  const unsubscribeArgs = selection.unsubscribe.mock.calls[0];

  expect(subscribeArgs).toEqual(unsubscribeArgs);
});
