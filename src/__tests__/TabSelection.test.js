import TabSelection from '../TabSelection';

test('TabSelection should accept default selection', () => {
  const tabSelection = new TabSelection({ defaultTab: 'foo' });
  expect(tabSelection).toBeDefined();
  expect(tabSelection.selected).toBe('foo');
});

test('TabSelection should be able to register new tabs', () => {
  const tabSelection = new TabSelection();
  tabSelection.register('foo');
  expect(tabSelection.tabs).toEqual(['foo']);
});

test('TabSelection should not be able to register the same tab several times', () => {
  const tabSelection = new TabSelection();
  tabSelection.register('foo');
  tabSelection.register('foo');
  tabSelection.register('foo');
  expect(tabSelection.tabs).toEqual(['foo']);
});

test('TabSelection should set first registered tab as selected if no defaultTab', () => {
  const tabSelection = new TabSelection();
  tabSelection.register('foo');
  expect(tabSelection.selected).toBe('foo');
});

test('TabSelection should be able to unregister', () => {
  const tabSelection = new TabSelection();
  tabSelection.register('foo');
  tabSelection.register('bar');
  tabSelection.unregister('bar');
  expect(tabSelection.tabs).toEqual(['foo']);
});

test('TabSelection should not be able to select unregistered tab', () => {
  const tabSelection = new TabSelection();
  tabSelection.register('foo');
  tabSelection.register('bar');

  tabSelection.select('baz');
  expect(tabSelection.selected).not.toBe('baz');
});

test('TabSelection should be able to select previous tab', () => {
  const tabSelection = new TabSelection({ defaultTab: 'baz' });
  tabSelection.register('foo');
  tabSelection.register('bar');
  tabSelection.register('baz');

  expect(tabSelection.selected).toBe('baz');
  tabSelection.selectPrevious();
  expect(tabSelection.selected).toBe('bar');
  tabSelection.selectPrevious();
  expect(tabSelection.selected).toBe('foo');
});

test('TabSelection should be able to select next tab', () => {
  const tabSelection = new TabSelection({ defaultTab: 'foo' });
  tabSelection.register('foo');
  tabSelection.register('bar');
  tabSelection.register('baz');

  expect(tabSelection.selected).toBe('foo');
  tabSelection.selectNext();
  expect(tabSelection.selected).toBe('bar');
  tabSelection.selectNext();
  expect(tabSelection.selected).toBe('baz');
});

test('TabSelection should have roving selection when selecting prev/next tab', () => {
  const tabSelection = new TabSelection({ defaultTab: 'foo' });
  tabSelection.register('foo');
  tabSelection.register('bar');
  tabSelection.register('baz');

  expect(tabSelection.selected).toBe('foo');
  tabSelection.selectPrevious();
  expect(tabSelection.selected).toBe('baz');
  tabSelection.selectNext();
  expect(tabSelection.selected).toBe('foo');
});

test('TabSelection should be able to select first tab', () => {
  const tabSelection = new TabSelection({ defaultTab: 'baz' });
  tabSelection.register('foo');
  tabSelection.register('bar');
  tabSelection.register('baz');

  tabSelection.selectFirst();

  expect(tabSelection.selected).toBe('foo');
});

test('TabSelection should be able to select last tab', () => {
  const tabSelection = new TabSelection({ defaultTab: 'foo' });
  tabSelection.register('foo');
  tabSelection.register('bar');
  tabSelection.register('baz');

  tabSelection.selectLast();

  expect(tabSelection.selected).toBe('baz');
});

test('TabSelection should be able to pass selection options', () => {
  const subscriber = jest.fn();
  const tabSelection = new TabSelection();
  tabSelection.register('foo');
  tabSelection.register('bar');
  tabSelection.register('baz');
  tabSelection.subscribe(subscriber);

  tabSelection.select('bar', { focus: true });
  expect(subscriber).toHaveBeenCalledWith({ focus: true });
  tabSelection.selectFirst({ focus: false });
  expect(subscriber).toHaveBeenCalledWith({ focus: false });
  tabSelection.selectNext({ focus: true });
  expect(subscriber).toHaveBeenCalledWith({ focus: true });
  tabSelection.selectLast({ focus: false });
  expect(subscriber).toHaveBeenCalledWith({ focus: false });
  tabSelection.selectPrevious({ focus: true });
  expect(subscriber).toHaveBeenCalledWith({ focus: true });

  expect(subscriber).toHaveBeenCalledTimes(5);
});

test('TabSelection should be able to select a tab', () => {
  const tabSelection = new TabSelection();
  tabSelection.register('foo');
  tabSelection.register('bar');

  expect(tabSelection.selected).toBe('foo');

  tabSelection.select('bar');
  expect(tabSelection.selected).not.toBe('foo');
  expect(tabSelection.selected).toBe('bar');
});

test('TabSelection should be able to subscribe for changes', () => {
  const subscriber = jest.fn();

  const tabSelection = new TabSelection();
  tabSelection.subscribe(subscriber);

  tabSelection.register('foo');
  tabSelection.register('bar');

  expect(subscriber).toHaveBeenCalledTimes(1);
  tabSelection.select('bar');
  expect(subscriber).toHaveBeenCalledTimes(2);
});

test('TabSelection should be able to unsubscribe', () => {
  const subscriber = jest.fn();

  const tabSelection = new TabSelection();
  tabSelection.subscribe(subscriber);

  tabSelection.register('foo');
  tabSelection.register('bar');

  expect(subscriber).toHaveBeenCalledTimes(1);
  tabSelection.unsubscribe(subscriber);
  tabSelection.select('bar');
  expect(subscriber).toHaveBeenCalledTimes(1);
});

test('TabSelection should call an optional onChange callback when something has changed', () => {
  const onChange = jest.fn();

  const tabSelection = new TabSelection({ defaultTab: 'foo', onChange });
  tabSelection.register('foo');
  tabSelection.register('bar');

  tabSelection.select('bar');
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('bar');
});
