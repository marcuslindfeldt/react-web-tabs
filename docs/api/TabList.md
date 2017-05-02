# `<TabList>`

A Tab List element with the correct WAI-ARIA attributes.

```js
import { TabList } from 'react-web-tabs'

<TabList>
  <button>Tab 1</button>
  <button>Tab 2</button>
</TabList>
```

## children: node

Any child node

```js
<TabList>
  <button>Tab 1</button>
  <button>Tab 2</button>
</TabList>
```

## vertical: bool (optional)

Adds the `aria-orientation="vertical"` attribute.
Implicitly set when wrapped in a `<TabProvider>` or `<Tabs>` component with the vertical prop.

```js
<TabList vertical>
  <button>Tab 1</button>
  <button>Tab 2</button>
</TabList>
```



## props: mixed (optional)

Any additional props that you can provide to a `<div>` element. E.g className, style, title, data attributes, etc.

```js
<TabList
  className="my-tablist"
  title="A tab list"
  style={{ background: 'rebeccapurple'}}
>
  <button>Tab 1</button>
  <button>Tab 2</button>
</TabList>
```
