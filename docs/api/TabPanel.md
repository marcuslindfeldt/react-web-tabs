# `<TabPanel>`

A Tab panel element with the correct WAI-ARIA attributes.

```js
import { TabPanel } from 'react-web-tabs'

<TabPanel tabId="my-tabpanel">
  <p>My tab panel</p>
</TabPanel>
```

## TabPanel render methods

There are 3 ways to render something with a `<TabPanel>` very similar to how react router works:

- [`<TabPanel component>`](#component-func)
- [`<TabPanel render>`](#render-func)
- [`<TabPanel children>`](#children-node)

Each is useful in different circumstances. You should use only one of these props on a given `<TabPanel>`. See their explanations below to understand why you have 3 options.

## TabPanel props

All three [render methods](#tabpanel-render-methods) will be passed a boolean property `selected` that will indicate if the tab is selected or not.

## component

A React component. It will be rendered with [tabpanel props](#tabpanel-props).

```js
<TabPanel tabId="my-tabpanel" component={Foo} />

const Foo = () => {
  return <h1>Foo!</h1>
}
```

When you use `component` (instead of `render`, below) the tabpanel uses [`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement) to create a new [React element](https://facebook.github.io/react/docs/rendering-elements.html) from the given component. That means if you provide an inline function, you are creating a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component. For inline rendering, use the `render` prop (below).

## render: func

This allows for convenient inline rendering and wrapping without the undesired remounting explained above.

Instead of having a new [React element](https://facebook.github.io/react/docs/rendering-elements.html) created for you using the [`component`](#component-func) prop, you can pass in a function. The `render` prop receives all the same [props](#tabpanel-props) as the `component` render prop.

```js
// convenient inline rendering
<TabPanel tabId="my-tabpanel" render={({ selected }) => selected ? (
  <div>My TabPanel</div>
) : (
  null
)}/>

// code-splitting
<TabPanel tabId="my-tabpanel" render={() => import('./MyTabPanel.jsx')}/>
```

**Warning:** `<TabPanel component>` takes precendence over `<TabPanel render>` so don't use both in the same `<TabPanel>`.

## children: node

Any child node

```js
<TabPanel tabId="my-tabpanel">
  <p>My tab panel</p>
</TabPanel>
```

## tabId: string

To connect a `<Tab>` to a `<TabPanel>` we need to make an id reference similar to how form inputs and labels work.

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
