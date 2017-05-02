# `<Tab>`

A Tab element with the correct WAI-ARIA attributes.

```js
import { Tab } from 'react-web-tabs'

<Tab tabFor="my-tab">React web tabs</Tab>
```

## children: node

Any child node

```js
<Tab tabFor="my-tab">
  <Icon glyph="heart">
  <span>React web tabs</span>
</Tab>
```

## tabFor: string

To connect a `<Tab>` to a `<TabPanel>` we need to make an id reference similar to how form inputs and labels work.

## selected: bool (optional)

If you wrap your tab in a `<TabProvider>` or `<Tabs>` component you don't need to manage selection.

## focusable: bool (optional)

According to the [WAI-ARIA Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) only the active tab should receive focus upon entering and leaving the tab list. Some people find this behavior confusing so to make all tabs focusable you can override this by adding the `focusable` flag.

```js

<Tab focusable tabFor="my-tab">React web tabs</Tab>
```

## onClick: func (optional)

On click callback, If you wrap your tab in a `<TabProvider>` or `<Tabs>` component it will get called after it has been selected.

## props: mixed (optional)

Any additional props that you can provide to a `<button>` element. E.g className, style, title, data attributes, etc.

The following props are reserved: id, role, aria-selected, aria-controls, onClick, onKeyDown, tabIndex.

```js
<Tab
  tabFor="my-tab"
  className="my-tab"
  title="A tab"
  style={{ background: 'rebeccapurple'}}
>
  React web tabs
</Tab>
```

## Keyboard support
The following keys can be used to navigate between tabs when in focus, according to the [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel). This requires your `<Tab>` to be wrapped within a `<TabProvider>` or `<Tabs>` component.

* <kbd>←</kbd> Navigate to previous tab
* <kbd>→</kbd> Navigate to next tab
* <kbd>HOME</kbd> Navigate to first tab
* <kbd>END</kbd> Navigate to last tab

When the tabs are vertical:

* <kbd>↑</kbd> Navigate to previous tab
* <kbd>↓</kbd> Navigate to next tab
* <kbd>HOME</kbd> Navigate to first tab
* <kbd>END</kbd> Navigate to last tab
