# react-web-tabs
[![npm](https://img.shields.io/npm/v/react-web-tabs.svg?style=flat-square)](https://www.npmjs.com/package/react-web-tabs)
[![Travis](https://img.shields.io/travis/marcuslindfeldt/react-web-tabs.svg?style=flat-square)](https://travis-ci.org/marcuslindfeldt/react-web-tabs)
[![Coveralls](https://img.shields.io/coveralls/marcuslindfeldt/react-web-tabs.svg?style=flat-square)](https://coveralls.io/github/marcuslindfeldt/react-web-tabs?branch=master)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/marcuslindfeldt/react-web-tabs/master/LICENSE)

Modular and accessible React tabs component

## Installation
> Note! This package depends on [React](https://facebook.github.io/react/) ^15.4.2

Using [npm](https://www.npmjs.com/):
```bash
npm install --save react-web-tabs
```
Using [yarn](https://yarnpkg.com/en/):
```bash
yarn add react-web-tabs
```

Then with a module bundler like [webpack](https://webpack.js.org/) you can import it like usual:

```js
// using ES6 modules
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

// using ES6 Partial imports
import Tabs from 'react-web-tabs/Tabs';
import Tab from 'react-web-tabs/Tab';
import TabPanel from 'react-web-tabs/TabPanel';
import TabList from 'react-web-tabs/TabList';

// using CommonJS modules
var Tabs = require('react-web-tabs').Tabs;
var Tab = require('react-web-tabs').Tab;
var TabPanel = require('react-web-tabs').TabPanel;
var TabList = require('react-web-tabs').TabList;
```

The UMD build is also available on unpkg:

```html
<script src="https://unpkg.com/react-web-tabs/dist/react-web-tabs.min.js"></script>
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

## Licence
MIT
