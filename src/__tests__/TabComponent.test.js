import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TabComponent from '../TabComponent';

Enzyme.configure({ adapter: new Adapter() });

test('<TabComponent /> should exist', () => {
  const tab = shallow((
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(tab).toBeDefined();
});

test('<TabComponent /> should be a button', () => {
  const tab = mount((
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(tab.find('button')).toBeDefined();
});

test('<TabComponent /> should render children', () => {
  const content = <span id="content">Tab 1</span>;
  const tab = mount((
    <TabComponent tabFor="foo">{content}</TabComponent>
  ));

  expect(tab.find('#content')).toBeTruthy();
});

test('<TabComponent /> should call callback on click', () => {
  const onClick = jest.fn();
  const tab = mount((
    <TabComponent tabFor="foo" onClick={onClick}><span>Tab 1</span></TabComponent>
  ));

  tab.simulate('click');

  expect(onClick).toHaveBeenCalled();
});

test('<TabComponent /> should be selectable', () => {
  const unselected = mount((
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(unselected.find('button').prop('aria-selected')).toBe(false);

  const selected = mount((
    <TabComponent selected tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(selected.find('button').prop('aria-selected')).toBe(true);
});

test('<TabComponent /> that is unselected is not focusable by default', () => {
  const unselected = mount((
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(unselected.find('button').prop('tabIndex')).toBe('-1');

  const selected = mount((
    <TabComponent selected tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(selected.find('button').prop('tabIndex')).toBe('0');
});


test('<TabComponent /> that is focusable should always have tabIndex 0', () => {
  const unselected = mount((
    <TabComponent focusable tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(unselected.find('button').prop('tabIndex')).toBe('0');

  const selected = mount((
    <TabComponent focusable selected tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(selected.find('button').prop('tabIndex')).toBe('0');
});

test('<TabComponent /> should have the correct aria attributes', () => {
  const tab = mount((
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(tab.find('button').prop('id')).toBe('foo-tab');
  expect(tab.find('button').prop('aria-controls')).toBe('foo');
  expect(tab.find('button').prop('role')).toBe('tab');
});

test('<TabComponent /> should be able to set any className', () => {
  const tab = shallow((
    <TabComponent tabFor="foo" className="foo"><span>Tab 1</span></TabComponent>
  ));

  expect(tab.hasClass('foo')).toBe(true);
});
