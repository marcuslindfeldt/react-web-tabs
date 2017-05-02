# Basic Tabs

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';


class MyBasicTabs extends Component {
  render() {
    return (
      <Tabs defaultTab="basic-tab-one">
        <TabList>
          <Tab tabFor="basic-tab-one">Tab 1</Tab>
          <Tab tabFor="basic-tab-two">Tab 2</Tab>
          <Tab tabFor="basic-tab-three">Tab 3</Tab>
        </TabList>
        <TabPanel tabId="basic-tab-one">
          <p>Tab 1 content</p>
        </TabPanel>
        <TabPanel tabId="basic-tab-two">
          <p>Tab 2 content</p>
        </TabPanel>
        <TabPanel tabId="basic-tab-three">
          <p>Tab 3 content</p>
        </TabPanel>
      </Tabs>
    );
  }
}

render(<MyBasicTabs/>, document.getElementById('app'));
```
