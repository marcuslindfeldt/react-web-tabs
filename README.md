# react-web-tabs

[![Build Status](https://travis-ci.org/marcuslindfeldt/react-web-tabs.svg?branch=master)](https://travis-ci.org/marcuslindfeldt/react-web-tabs)
[![Coverage Status](https://coveralls.io/repos/github/marcuslindfeldt/react-web-tabs/badge.svg?branch=master)](https://coveralls.io/github/marcuslindfeldt/react-web-tabs?branch=master)

Modular and accessible React tabs component

## Installation

```bash
yarn add react-web-tabs
```

## Usage

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';


class App extends Component {
  render() {
    return (
      <Tabs defaultTab="one">
        <TabList>
          <Tab tabFor="one">Tab 1</Tab>
          <Tab tabFor="two">Tab 2</Tab>
          <Tab tabFor="three">Tab 3</Tab>
        </TabList>
        <TabPanel tabId="one">
          <p>Tab 1 content</p>
        </TabPanel>
        <TabPanel tabId="two">
          <p>Tab 2 content</p>
        </TabPanel>
        <TabPanel tabId="three">
          <p>Tab 3 content</p>
        </TabPanel>
      </Tabs>
    );
  }
}

render(<App/>, document.getElementById('app'));
```
