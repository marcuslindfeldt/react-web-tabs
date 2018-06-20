import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TabPanel from '../TabPanel';

Enzyme.configure({ adapter: new Adapter() });

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

test('<TabPanel /> should render component', () => {
  const Foo = () => (<span id="content">Foo</span>);

  const tabPanel = mount((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo" component={Foo} />
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
  expect(tabPanel.find('Foo')).toBeTruthy();
});

test('<TabPanel /> should be able to pass a render function', () => {
  const tabPanel = mount((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo" render={() => (<span id="content">Foo</span>)} />
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
});

test('<TabPanel /> should render children', () => {
  const tabPanel = mount((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo"><span id="content">Foo</span></TabPanel.WrappedComponent>
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
});

test('<TabPanel /> should have the correct aria attributes', () => {
  const tabPanel = render((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>
  ));

  expect(tabPanel.prop('id')).toBe('foo');
  expect(tabPanel.prop('aria-labelledby')).toBe('foo-tab');
  expect(tabPanel.prop('role')).toBe('tabpanel');
});

test('<TabPanel /> should have the rwt__tabpanel className by default', () => {
  const tabPanel = mount((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>
  ));

  expect(tabPanel.find('div').prop('className').trim()).toEqual('rwt__tabpanel');
});

test('<TabPanel /> should be able to set any className', () => {
  const tabPanel = shallow((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo" className="foo"><span>Foo</span></TabPanel.WrappedComponent>
  ));

  expect(tabPanel.hasClass('foo')).toBe(true);
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
