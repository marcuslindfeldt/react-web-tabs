import React from 'react';
import { shallow, mount } from 'enzyme';
import Tab, { KeyCode } from '../Tab';

const mockSelection = () => ({
  register: jest.fn(),
  unregister: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  isSelected: jest.fn(),
  select: jest.fn(),
  selectPrevious: jest.fn(),
  selectNext: jest.fn(),
  selectFirst: jest.fn(),
  selectLast: jest.fn(),
  isVertical: jest.fn(),
});

test('<Tab /> should exist', () => {
  const tab = shallow((
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(tab).toBeDefined();
});

test('<Tab /> should be a button', () => {
  const tab = mount((
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(tab.find('button')).toBeDefined();
});

test('<Tab /> should render children', () => {
  const content = <span id="content">Tab 1</span>;
  const tab = mount((
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo">{content}</Tab.WrappedComponent>
  ));

  expect(tab.find('#content')).toBeTruthy();
});

test('<Tab /> should call callback on click', () => {
  const onClick = jest.fn();
  const tab = mount((
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo" onClick={onClick}><span>Tab 1</span></Tab.WrappedComponent>
  ));

  tab.simulate('click');

  expect(onClick).toHaveBeenCalled();
});

test('<Tab /> should be selectable', () => {
  const selection = mockSelection();
  selection.isSelected = () => false;
  const unselected = mount((
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(unselected.find('button').prop('aria-selected')).toBe(false);

  selection.isSelected = () => true;
  const selected = mount((
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(selected.find('button').prop('aria-selected')).toBe(true);
});

test('<Tab /> that is unselected is not focusable by default', () => {
  const selection = mockSelection();
  const unselected = mount((
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(unselected.find('button').prop('tabIndex')).toBe('-1');

  selection.isSelected = () => true;
  const selected = mount((
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(selected.find('button').prop('tabIndex')).toBe('0');
});


test('<Tab /> that is focusable should always have tabIndex 0', () => {
  const unselected = mount((
    <Tab.WrappedComponent selection={mockSelection()} focusable tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(unselected.find('button').prop('tabIndex')).toBe('0');

  const selected = mount((
    <Tab.WrappedComponent selection={mockSelection()} focusable selected tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(selected.find('button').prop('tabIndex')).toBe('0');
});

test('<Tab /> should have the correct aria attributes', () => {
  const tab = mount((
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(tab.find('button').prop('id')).toBe('foo-tab');
  expect(tab.find('button').prop('aria-controls')).toBe('foo');
  expect(tab.find('button').prop('role')).toBe('tab');
});

test('<Tab /> should be able to set any className', () => {
  const tab = shallow((
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo" className="foo"><span>Tab 1</span></Tab.WrappedComponent>
  ));

  expect(tab.hasClass('foo')).toBe(true);
});

test('<Tab /> should be able to select previous tab with LEFT_ARROW key', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.LEFT_ARROW });

  expect(selection.selectPrevious).toHaveBeenCalled();
});

test('<Tab /> should be able to select next tab RIGHT_ARROW key', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.RIGHT_ARROW });

  expect(selection.selectNext).toHaveBeenCalled();
});

test('<Tab /> should not be able to select prev/next tab with UP_ARROW/DOWN_ARROW key when horizontal', () => {
  const selection = mockSelection();

  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.UP_ARROW });
  tab.simulate('keydown', { keyCode: KeyCode.DOWN_ARROW });

  expect(selection.selectPrevious).not.toHaveBeenCalled();
  expect(selection.selectNext).not.toHaveBeenCalled();
});

test('<Tab /> should be able to select previous tab with UP_ARROW key when vertical', () => {
  const selection = mockSelection();

  selection.isVertical = jest.fn(() => true);

  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.UP_ARROW });

  expect(selection.selectPrevious).toHaveBeenCalled();
});

test('<Tab /> should be able to select next tab DOWN_ARROW key when vertical', () => {
  const selection = mockSelection();

  selection.isVertical = jest.fn(() => true);

  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.DOWN_ARROW });

  expect(selection.selectNext).toHaveBeenCalled();
});

test('<Tab /> should not be able to select prev/next tab with LEFT_ARROW/RIGHT_ARROW key when vertical', () => {
  const selection = mockSelection();

  selection.isVertical = jest.fn(() => true);

  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.LEFT_ARROW });
  tab.simulate('keydown', { keyCode: KeyCode.RIGHT_ARROW });

  expect(selection.selectPrevious).not.toHaveBeenCalled();
  expect(selection.selectNext).not.toHaveBeenCalled();
});

test('<Tab /> should be able to select first tab with HOME key', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.HOME });

  expect(selection.selectFirst).toHaveBeenCalled();
});

test('<Tab /> should be able to select last tab with END key', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.END });

  expect(selection.selectLast).toHaveBeenCalled();
});

test('<Tab /> should not change selection on unrecognized key event', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown');

  expect(selection.selectFirst).not.toHaveBeenCalled();
  expect(selection.selectLast).not.toHaveBeenCalled();
  expect(selection.selectPrevious).not.toHaveBeenCalled();
  expect(selection.selectNext).not.toHaveBeenCalled();
  expect(selection.select).not.toHaveBeenCalled();
});

test('<Tab /> should shift focus if selecting a different tab using keyboard navigation', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.simulate('keydown', { keyCode: KeyCode.LEFT_ARROW });

  expect(selection.selectPrevious).toHaveBeenCalledWith({ focus: true });
});

test('<Tab /> should subscribe and unsubscribe for context changes', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  expect(selection.register).toHaveBeenCalledTimes(1);
  expect(selection.subscribe).toHaveBeenCalledTimes(1);
  tab.unmount();
  expect(selection.register).not.toHaveBeenCalledTimes(2);
  expect(selection.subscribe).not.toHaveBeenCalledTimes(2);
  expect(selection.unsubscribe).toHaveBeenCalledTimes(1);
  expect(selection.unregister).toHaveBeenCalledTimes(1);
});

test('<Tab /> should unsubscribe with the same function as subscribed with', () => {
  const selection = mockSelection();
  const tab = mount(
    <Tab.WrappedComponent selection={selection} tabFor="foo" ><span>Tab 1</span></Tab.WrappedComponent>,
  );

  tab.unmount();
  const subscribeArgs = selection.subscribe.mock.calls[0];
  const unsubscribeArgs = selection.unsubscribe.mock.calls[0];
  const registerArgs = selection.register.mock.calls[0];
  const unregisterArgs = selection.unregister.mock.calls[0];

  expect(subscribeArgs).toEqual(unsubscribeArgs);
  expect(registerArgs).toEqual(unregisterArgs);
});
