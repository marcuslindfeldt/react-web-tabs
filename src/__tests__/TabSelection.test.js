import TabSelection from '../TabSelection';

test('TabSelection should accept default selection', () => {
  const tabSelection = new TabSelection('foo');
  expect(tabSelection).toBeDefined();
  expect(tabSelection.selected).toBe('foo');
});

test('TabSelection should be able to select a tab', () => {
  const tabSelection = new TabSelection();

  expect(tabSelection.selected).toBeUndefined();

  tabSelection.select('foo');
  expect(tabSelection.selected).toBe('foo');

  tabSelection.select('bar');
  expect(tabSelection.selected).not.toBe('foo');
  expect(tabSelection.selected).toBe('bar');
});

test('TabSelection should be able to subscribe for changes', () => {
  const subscriber = jest.fn();

  const tabSelection = new TabSelection();

  tabSelection.subscribe(subscriber);
  tabSelection.select('foo');
  expect(subscriber).toHaveBeenCalledTimes(1);
  tabSelection.select('bar');
  expect(subscriber).toHaveBeenCalledTimes(2);
});

test('TabSelection should be able to unsubscribe', () => {
  const subscriber = jest.fn();

  const tabSelection = new TabSelection();

  tabSelection.subscribe(subscriber);
  tabSelection.select('foo');
  expect(subscriber).toHaveBeenCalledTimes(1);
  tabSelection.unsubscribe(subscriber);
  tabSelection.select('bar');
  expect(subscriber).toHaveBeenCalledTimes(1);
});

test('TabSelection should call an optional onChange callback when something has changed', () => {
  const onChange = jest.fn();

  const tabSelection = new TabSelection('foo', onChange);

  tabSelection.select('bar');
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('bar');
});
