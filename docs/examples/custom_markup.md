# Tabs with custom markup

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { TabProvider, Tab, TabPanel, TabList } from 'react-web-tabs';


class CustomTabs extends Component {
  render() {
    return (
      <TabProvider defaultTab="custom-tab-one">
        <section className="my-custom-tabs">
          <TabList className="my-custom-tablist">
            <Tab tabFor="custom-tab-one">Tab 1</Tab>
            <span className="divider" role="presentation" aria-hidden="true">•</span>
            <Tab tabFor="custom-tab-two">Tab 2</Tab>
            <span className="divider" role="presentation" aria-hidden="true">•</span>
            <Tab tabFor="custom-tab-three" className="my-custom-tab">Tab 3</Tab>
          </TabList>
          <div className="my-tabs-panel-wrapper">
            <TabPanel tabId="custom-tab-one">
              <p>Tab 1 content</p>
            </TabPanel>
            <TabPanel tabId="custom-tab-two">
              <p>Tab 2 content</p>
            </TabPanel>
            <TabPanel tabId="custom-tab-three">
              <p>Tab 3 content</p>
            </TabPanel>
          </div>
        </section>
      </TabProvider>
    );
  }
}

render(<CustomTabs/>, document.getElementById('app'));
```
