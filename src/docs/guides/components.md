# Components

Inferno offers three different types of components to use when building a UI: functional components, ES2015 class components and ES5 class components.

## Functional Components

Functional components are pure functions that represent the "render" functions of traditional ES2015 and ES5 class components.

*Using JSX:*
```javascript
import { render } from 'inferno';

const MyComponent = ({ name, age }) => (
  <span>My name is: {name} and my age is: {age}</span>
);

// usage
render(<MyComponent name="Inferno" age={2}/>, container);
```

*Using createElement:*
```js
import { render } from 'inferno';
import { createElement } from 'inferno-create-element';

function MyComponent({ name, age }) {
  return createElement('span', null, `My name is: {name} and my age is: {age}`)
}

// usage
render(createElement(MyComponent, {
  name: 'Inferno',
  age: 2
}), container);
```

Functional components do not have state, instead they rely solely on `props` being passed into the component. Unlike React and
other UI libraries, Inferno provides lifecycle events for functional components. Scroll down for documentation.

### Functional Lifecycle events

Lifecycle events for functional components get applied as if they were normal `props`. For example:

`<MyComponent onComponentWillMount={ ... } />`

Below are all the different lifecycle event names that can be applied to functional components:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Triggered when</th>
      <th>Arguments to callback</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>onComponentWillMount</code></td>
      <td>a functional component is about to mount</td>
      <td></td>
    </tr>
    <tr>
      <td><code>onComponentDidMount</code></td>
      <td>a functional component has mounted successfully</td>
      <td><code>domNode</code></td>
    </tr>
    <tr>
      <td><code>onComponentShouldUpdate</code></td>
      <td>a functional component has been triggered to update</td>
      <td><code>lastProps, nextProps</code></td>
    </tr>
    <tr>
      <td><code>onComponentWillUpdate</code></td>
      <td>a functional component is about to perform an update</td>
      <td><code>lastProps, nextProps</code></td>
    </tr>
    <tr>
      <td><code>onComponentDidUpdate</code></td>
      <td>a functional component has performed an update</td>
      <td><code>lastProps, nextProps</code></td>
    </tr>
    <tr>
      <td><code>onComponentWillUnmount</code></td>
      <td>a functional component is about to be unmounted</td>
      <td></td>
    </tr>
  </tbody>
<table>

If you were to use a functional component lifecycle event, please note that they do not work exactly as ES2015 lifecycle events do.
They have different arguments passed to the events and have no form of state.

Below is an example of how you might use a functional component with lifecycle events:

```javascript
import { render } from 'inferno';

function mounted(domNode) {
    // [domNode] will be available for DOM nodes and components (if the component has mounted to the DOM)
}

function FunctionalComponent({ props }) {
  return <div>Hello world</div>
}

render(<FunctionalComponent onComponentDidMount={ mounted } />, document.getElementById('app'));
```

Functional component default hooks:
```javascript
export function Static() {
    return <div>1</div>;
}

Static.defaultHooks = {
    onComponentShouldUpdate() {
        return false;
    }
}
```


## ES2015 Class Components

Inferno has ES2015 class components available inside `inferno` package.
To use `inferno-component`, very much like React, you create a `class` and extend `Component`:

```jsx
import { Component, render } from 'inferno';

class MyComponent extends Component {
  render() {
    return <div>Hello world</div>
  }
}

render(<MyComponent />, document.getElementById('app'));
```

### Class component lifecycle methods

Like functional components, ES2015 class components have lifecycle events too. They work exactly like React's class
components do. Below is a list of all the lifecycle events:

<table>
   <thead>
      <tr>
         <th>Name</th>
         <th>Triggered when</th>
         <th>Arguments to callback</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><code>componentDidMount</code></td>
         <td>component has been mounted succesfully</td>
         <td></td>
      </tr>
      <tr>
         <td><code>componentWillMount</code></td>
         <td>component is about to mount</td>
         <td></td>
      </tr>
      <tr>
         <td><code>componentWillReceiveProps</code></td>
         <td>before render when component updates</td>
         <td><code>nextProps, context</code></td>
      </tr>
      <tr>
         <td><code>shouldComponentUpdate</code></td>
         <td>component has been triggered to update, return false to skip render</td>
         <td><code>nextProps, nextState</code></td>
      </tr>
      <tr>
         <td><code>componentWillUpdate</code></td>
         <td>component is about to perform an update</td>
         <td><code>nextProps, nextState, context</code></td>
      </tr>
      <tr>
         <td><code>componentDidUpdate</code></td>
         <td>component has performed an update</td>
         <td><code>lastProps, lastState, snapshot</code></td>
      </tr>
      <tr>
         <td><code>componentWillUnmount</code></td>
         <td>component is about to be unmounted</td>
         <td></td>
      </tr>
      <tr>
         <td><code>getChildContext</code></td>
         <td>before render method, return value object is combined to sub tree context</td>
         <td></td>
      </tr>
      <tr>
         <td><code>getSnapshotBeforeUpdate</code></td>
         <td>before component updates, return value is sent to componentDidUpdate as 3rd parameter</td>
         <td><code>lastProps, lastState</code></td>
      </tr>
      <tr>
         <td><code>static getDerivedStateFromProps</code></td>
         <td>before render method</td>
         <td><code>nextProps, state</code></td>
      </tr>
   </tbody>
</table>

The below is an example of using the `componentDidMount` lifecycle event to request AJAX data on a component:

```jsx
import { Component } from 'inferno';
import myAPI from './myAPI';

class AjaxComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    myAPI.fetch('/item-names').then(data => {
      this.setState({ data: data })
    })
  }
  render() {
    return (
      <ul>
        {this.state.data.map(data => (
          <li>{data.name}</li>
        ))}
      </ul>
    )
  }
}
```


## ES5 Class Components

Inferno offers ES5 class components as a separate package called `inferno-create-class`.
Note: The recommended way to create Components is Functional components, or by extending ES2015 class Components.
This package provides auto bind mechanism same way as old `React.createClass({})` but it affects negatively performance.

To enable this functionality you can either install via NPM or use the script from the CDN:

*NPM:*
```sh
npm install --save inferno-create-class
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno-create-class@[version]/dist/inferno-create-class.js"></script>
<script src="https://unpkg.com/inferno-create-class@[version]/dist/inferno-create-class.min.js"></script>
```

Note: `inferno-create-class` works exactly like React's [`React.createClass()`](https://facebook.github.io/react/docs/react-api.html#createclass) API works.
