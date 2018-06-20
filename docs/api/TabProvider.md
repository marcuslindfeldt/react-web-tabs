# `<TabProvider>`

A Higher Order Component (HOC) that provides the tab selection functionality.

```js
import { TabProvider } from 'react-web-tabs'

<TabProvider>
  <div className="my-tabs">
    ...
  </div>
</TabProvider>
```

## children: node

A single child node.

```js
<TabProvider>
  <div className="my-tabs">
    ...
  </div>
</TabProvider>
```

## defaultTab: string (optional)

The id of the tab that should be selected by default. If none is provided it will be the first tab.

```js
<TabProvider defaultTab="two">
  <div className="my-tabs">
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
  </div>
</TabProvider>
```

## vertical: bool (optional)

Provides support for vertically aligned tabs. Correct aria-attributes will be set and keyboard shortcuts will change from right/left arrow to up/down arrow.

## collapsible: bool (optional)

Provides support for deselection of current tab. If an active tab is selected it will be deselected.

## onChange: func (optional)

A callback that is triggered when a new tab has been selected.

```js
<TabProvider onChange={(tabId) => { console.log(tabId) }}>
  <div className="my-tabs">
    ...
  </div>
</TabProvider>
```
