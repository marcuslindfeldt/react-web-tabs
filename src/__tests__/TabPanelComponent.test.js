import React from 'react';
import { shallow, mount } from 'enzyme';
import TabPanelComponent from '../TabPanelComponent';

const mockSelection = () => ({
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  isSelected: jest.fn(),
});

test('<TabPanelComponent /> should exist', () => {
  const tabPanel = mount((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanelComponent>
  ));

  expect(tabPanel).toBeDefined();
});

test('<TabPanelComponent /> should render component', () => {
  const Foo = () => (<span id="content">Foo</span>);

  const tabPanel = mount((
    <TabPanelComponent selection={mockSelection()} tabId="foo" component={Foo} />
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
  expect(tabPanel.find('Foo')).toBeTruthy();
});

test('<TabPanelComponent /> should be able to pass a render function', () => {
  const tabPanel = mount((
    <TabPanelComponent selection={mockSelection()} tabId="foo" render={() => (<span id="content">Foo</span>)} />
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
});

test('<TabPanelComponent /> should render children', () => {
  const tabPanel = mount((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span id="content">Foo</span></TabPanelComponent>
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
});

test('<TabPanelComponent /> should have the correct aria attributes', () => {
  const tabPanel = mount((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanelComponent>
  ));

  expect(tabPanel.find('div').prop('id')).toBe('foo');
  expect(tabPanel.find('div').prop('aria-labelledby')).toBe('foo-tab');
  expect(tabPanel.find('div').prop('role')).toBe('tabpanel');
});

test('<TabPanelComponent /> should have the rwt__tabpanel className by default', () => {
  const tabPanel = mount((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanelComponent>
  ));

  expect(tabPanel.find('div').prop('className').trim()).toEqual('rwt__tabpanel');
});

test('<TabPanelComponent /> should be able to set any className', () => {
  const tabPanel = shallow((
    <TabPanelComponent selection={mockSelection()} tabId="foo" className="foo"><span>Foo</span></TabPanelComponent>
  ));

  expect(tabPanel.hasClass('foo')).toBe(true);
});
