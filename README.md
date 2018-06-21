# react-web-tabs
[![npm](https://img.shields.io/npm/v/react-web-tabs.svg?style=flat-square)](https://www.npmjs.com/package/react-web-tabs)
[![Travis](https://img.shields.io/travis/marcuslindfeldt/react-web-tabs.svg?style=flat-square)](https://travis-ci.org/marcuslindfeldt/react-web-tabs)
[![Coveralls](https://img.shields.io/coveralls/marcuslindfeldt/react-web-tabs.svg?style=flat-square)](https://coveralls.io/github/marcuslindfeldt/react-web-tabs?branch=master)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/marcuslindfeldt/react-web-tabs/master/LICENSE)

Modular and accessible React tabs according to the [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel).

## Demo
See the [demo website](https://react-web-tabs.firebaseapp.com/) for a live example.

## Documentation
Read the [docs](https://marcuslindfeldt.github.io/react-web-tabs/) for more comprehensive [examples](https://marcuslindfeldt.github.io/react-web-tabs/examples) and [API Reference](https://marcuslindfeldt.github.io/react-web-tabs/docs/api/).

## Installation
> Note! This package depends on [React](https://facebook.github.io/react/) ^16.3.0

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
import Tabs from 'react-web-tabs/lib/Tabs';
import Tab from 'react-web-tabs/lib/Tab';
import TabPanel from 'react-web-tabs/lib/TabPanel';
import TabList from 'react-web-tabs/lib/TabList';

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
      <Tabs
        defaultTab="one"
        onChange={(tabId) => { console.log(tabId) }}
      >
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

If you need to make it more interesting and mix in other elements you can do that to:

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { TabProvider, Tab, TabPanel, TabList } from 'react-web-tabs';


class App extends Component {
  render() {
    return (
      <TabProvider defaultTab="one">
        <section className="my-tabs">
          <TabList className="my-tablist">
            <Tab tabFor="one">Tab 1</Tab>
            <span className="divider">•</span>
            <Tab tabFor="two">Tab 2</Tab>
            <span className="divider">•</span>
            <Tab tabFor="three" className="my-tab">Tab 3</Tab>
          </TabList>
          <div className="wrapper">
            <TabPanel tabId="one">
              <p>Tab 1 content</p>
            </TabPanel>
            <TabPanel tabId="two">
              <p>Tab 2 content</p>
            </TabPanel>
            <TabPanel tabId="three">
              <p>Tab 3 content</p>
            </TabPanel>
          </div>
        </section>
      </TabProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));
```

And of course every component supports adding additional props like custom className's or data attributes.

## Styles

Some basic styles are provided as well but they are optional as the tabs are fully functional without styling and I do encourage you to create your own. Both minified and unminified versions are available in the `/dist` folder.

With webpack:
```js
import 'react-web-tabs/dist/react-web-tabs.css';
```

## Keyboard support
The following keys can be used to navigate between tabs when in focus, according to the [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel).


* <kbd>←</kbd> Navigate to previous tab
* <kbd>→</kbd> Navigate to next tab
* <kbd>HOME</kbd> Navigate to first tab
* <kbd>END</kbd> Navigate to last tab

When the tabs are vertical:

* <kbd>↑</kbd> Navigate to previous tab
* <kbd>↓</kbd> Navigate to next tab
* <kbd>HOME</kbd> Navigate to first tab
* <kbd>END</kbd> Navigate to last tab

According to the [WAI-ARIA Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) only the active tab should receive focus upon entering and leaving the tab list. Some people find this behavior confusing so to make all tabs focusable you can override this behavior by adding the `focusable` flag to each `<Tab>` component. E.g.

```js

<Tab focusable tabFor="my-tab">React web tabs</Tab>
```


## Issues
If you find a bug, please file an issue on the [issue tracker on GitHub](https://github.com/marcuslindfeldt/react-web-tabs/issues).

## Licence
MIT
