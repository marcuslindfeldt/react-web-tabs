import React from 'react';
import { shallow, mount } from 'enzyme';
import Tab from '../Tab';

test('<Tab /> should exist', () => {
  const tab = shallow((
    <Tab tabFor="foo"><span>Tab 1</span></Tab>
  ));

  expect(tab).toBeDefined();
});

test('<Tab /> should be a button', () => {
  const tab = shallow((
    <Tab tabFor="foo"><span>Tab 1</span></Tab>
  ));

  expect(tab.is('button')).toBe(true);
});

test('<Tab /> should render children', () => {
  const content = <span id="content">Tab 1</span>;
  const tab = mount((
    <Tab tabFor="foo">{content}</Tab>
  ));

  expect(tab.find('#content')).toBeTruthy();
});

test('<Tab /> should call callback on click', () => {
  const onClick = jest.fn();
  const tab = mount((
    <Tab tabFor="foo" onClick={onClick}><span>Tab 1</span></Tab>
  ));

  tab.simulate('click');

  expect(onClick).toHaveBeenCalled();
});

test('<Tab /> should be selectable', () => {
  const unselected = shallow((
    <Tab tabFor="foo"><span>Tab 1</span></Tab>
  ));

  expect(unselected.prop('aria-selected')).toBe(false);
  expect(unselected.prop('aria-expanded')).toBe(false);

  const selected = shallow((
    <Tab tabFor="foo" selected><span>Tab 1</span></Tab>
  ));

  expect(selected.prop('aria-selected')).toBe(true);
  expect(selected.prop('aria-expanded')).toBe(true);
});

test('<Tab /> should have the correct aria attributes', () => {
  const tab = shallow((
    <Tab tabFor="foo"><span>Tab 1</span></Tab>
  ));

  expect(tab.prop('id')).toBe('foo-tab');
  expect(tab.prop('aria-controls')).toBe('foo');
  expect(tab.prop('role')).toBe('tab');
});

test('<Tab /> should be able to set any className', () => {
  const tab = shallow((
    <Tab tabFor="foo" className="foo"><span>Tab 1</span></Tab>
  ));

  expect(tab.hasClass('foo')).toBe(true);
});

test('<Tab /> should subscribe and unsubscribe for context changes', () => {
  const selection = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    isSelected: jest.fn(),
  };
  const tab = mount(
    <Tab tabFor="foo" ><span>Tab 1</span></Tab>,
    {
      childContextTypes: {
        selection: React.PropTypes.object.isRequired,
      },
      context: {
        selection,
      },
    },
  );

  expect(selection.subscribe).toHaveBeenCalledTimes(1);
  tab.unmount();
  expect(selection.subscribe).not.toHaveBeenCalledTimes(2);
  expect(selection.unsubscribe).toHaveBeenCalledTimes(1);
});

test('<Tab /> should unsubscribe with the same function as subscribed with', () => {
  const selection = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    isSelected: jest.fn(),
  };
  const tab = mount(
    <Tab tabFor="foo" ><span>Tab 1</span></Tab>,
    {
      childContextTypes: {
        selection: React.PropTypes.object.isRequired,
      },
      context: {
        selection,
      },
    },
  );

  tab.unmount();
  const subscribeArgs = selection.subscribe.mock.calls[0];
  const unsubscribeArgs = selection.unsubscribe.mock.calls[0];

  expect(subscribeArgs).toEqual(unsubscribeArgs);
});
