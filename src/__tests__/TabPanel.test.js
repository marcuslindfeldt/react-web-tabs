import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import TabPanel from '../TabPanel';

test('<TabPanel /> should exist', () => {
  const tabPanel = mount((
    <TabPanel tabId="foo"><span>Foo</span></TabPanel>
  ));

  expect(tabPanel).toBeDefined();
});

test('<TabPanel /> should render component', () => {
  const Foo = () => (<span id="content">Foo</span>);

  const tabPanel = mount((
    <TabPanel tabId="foo" component={Foo} />
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
  expect(tabPanel.find('Foo')).toBeTruthy();
});

test('<TabPanel /> should be able to pass a render function', () => {
  const tabPanel = mount((
    <TabPanel tabId="foo" render={() => (<span id="content">Foo</span>)} />
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
});

test('<TabPanel /> should render children', () => {
  const tabPanel = mount((
    <TabPanel tabId="foo"><span id="content">Foo</span></TabPanel>
  ));

  expect(tabPanel.find('#content')).toBeTruthy();
});

test('<TabPanel /> should be selectable', () => {
  const unselected = shallow((
    <TabPanel tabId="foo"><span>Foo</span></TabPanel>
  ));

  expect(unselected.prop('aria-hidden')).toBe(true);
  expect(unselected.prop('aria-expanded')).toBe(false);

  const selected = shallow((
    <TabPanel tabId="foo" selected><span>Foo</span></TabPanel>
  ));

  expect(selected.prop('aria-hidden')).toBe(false);
  expect(selected.prop('aria-expanded')).toBe(true);
});

test('<TabPanel /> should have the correct aria attributes', () => {
  const tabPanel = shallow((
    <TabPanel tabId="foo"><span>Foo</span></TabPanel>
  ));

  expect(tabPanel.prop('id')).toBe('foo');
  expect(tabPanel.prop('aria-labelledby')).toBe('foo-tab');
  expect(tabPanel.prop('role')).toBe('tabpanel');
});

test('<TabPanel /> should have the rwt__tabpanel className by default', () => {
  const tabPanel = mount((
    <TabPanel tabId="foo"><span>Foo</span></TabPanel>
  ));

  expect(tabPanel.find('div').prop('className').trim()).toEqual('rwt__tabpanel');
});

test('<TabPanel /> should be able to set any className', () => {
  const tabPanel = shallow((
    <TabPanel tabId="foo" className="foo"><span>Foo</span></TabPanel>
  ));

  expect(tabPanel.hasClass('foo')).toBe(true);
});

test('<TabPanel /> should subscribe and unsubscribe for context changes', () => {
  const selection = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    isSelected: jest.fn(),
  };

  const tabPanel = mount(
    <TabPanel tabId="foo"><span>Foo</span></TabPanel>,
    {
      childContextTypes: {
        selection: PropTypes.object.isRequired,
      },
      context: {
        selection,
      },
    },
  );

  expect(selection.subscribe).toHaveBeenCalledTimes(1);
  tabPanel.unmount();
  expect(selection.subscribe).not.toHaveBeenCalledTimes(2);
  expect(selection.unsubscribe).toHaveBeenCalledTimes(1);
});

test('<TabPanel /> should unsubscribe with the same function as subscribed with', () => {
  const selection = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    isSelected: jest.fn(),
  };
  const tabPanel = mount(
    <TabPanel tabId="foo"><span>Foo</span></TabPanel>,
    {
      childContextTypes: {
        selection: PropTypes.object.isRequired,
      },
      context: {
        selection,
      },
    },
  );

  tabPanel.unmount();
  const subscribeArgs = selection.subscribe.mock.calls[0];
  const unsubscribeArgs = selection.unsubscribe.mock.calls[0];

  expect(subscribeArgs).toEqual(unsubscribeArgs);
});
