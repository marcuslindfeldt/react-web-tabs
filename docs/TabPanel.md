# `<TabPanel>`

A Tab panel element with the correct WAI-ARIA attributes.

```js
import { TabPanel } from 'react-web-tabs'

<TabPanel tabId="my-tabpanel">
  <p>My tab panel</p>
</TabPanel>
```

## children: node

Any child node

```js
<TabPanel tabId="my-tabpanel">
  <p>My tab panel</p>
</TabPanel>
```

## tabId: string

To connect a `<Tab>` to a `<TabPanel>` we need to make an id reference similar to how form inputs and labels work.

## selected: bool (optional)

If you wrap your tab in a `<TabProvider>` or `<Tabs>` component you don't need to manage selection.

## props: mixed (optional)

Any additional props that you can provide to a `<div>` element. E.g className, style, title, data attributes, etc.

The following props are reserved: id, role, aria-expanded, aria-hidden, aria-labelledby, hidden.

```js
<TabPanel
  tabId="my-tabpanel"
  className="my-tabpanel"
  title="A tab panel"
  style={{ background: 'rebeccapurple'}}
>
  <p>My tab panel</p>
</TabPanel>
```
