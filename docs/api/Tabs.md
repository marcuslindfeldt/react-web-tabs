# `<Tabs>`

A Tabs container element that uses the `<TabProvider>` behind the scenes.

```js
import { Tabs } from 'react-web-tabs'

<Tabs defaultTab="two" onChange={(tabId) => { console.log(tabId) }}>
  <TabList>
    <Tab tabFor="one">Tab 1</Tab>
    <Tab tabFor="two">Tab 2</Tab>
  </TabList>
  <TabPanel tabId="one">
    <p>Tab 1 content</p>
  </TabPanel>
  <TabPanel tabId="two">
    <p>Tab 2 content</p>
  </TabPanel>
</Tabs>
```

## children: node

Any child node

```js
<Tabs>
  <button>Tab 1</button>
  <button>Tab 2</button>
</Tabs>
```

## defaultTab: string (optional)

See `<TabProvider>`.

## vertical: bool (optional)

Adds the `data-rwt-vertical="true"` attribute and provides functionality for vertical tabs.
See `<TabProvider>`.

## collapsible: bool (optional)

See `<TabProvider>`.

## onChange: func (optional)

See `<TabProvider>`.

## props: mixed (optional)

Any additional props that you can provide to a `<button>` element. E.g className, style, title, data attributes, etc.

```js
<Tabs
  className="my-tabs"
  title="My tabs"
  style={{ background: 'rebeccapurple'}}
>
  React web tabs
</Tabs>
```
