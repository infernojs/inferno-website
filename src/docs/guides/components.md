# Components

Inferno offers three different types of components to use when building a UI: functional components, ES2015 class components and ES5 class components.

## Functional Components

Functional components are pure functions that represent the "render" functions of traditional ES2015 and ES5 class components.

*Using JSX:*
```js
import Inferno from 'inferno';

function MyComponent(props) {
	return <div>I am a functional component</div>;
}
```
*Using createElement:*
```js
import createElement from 'inferno-create-element';

function MyComponent(props) {
	return createElement('div', null, 'I am a functional component');
}
```

Functional components do not have state, instead they solely rely on `props` being pass into the component. Unlike React and
other UI libraries, Inferno provides lifecycle events for functional components.

## ES2015 Class Components

Inferno offers ES2015 class components as a separate package called `inferno-component`, unlike other libraries like React. To install this functionality
you can install via NPM or using the script from the CDN:

*NPM:*
```sh
npm install --save inferno-component
```
```

Note: `inferno-component` works exactly like React's [`React.Component`](https://facebook.github.io/react/docs/react-api.html#react.component) API works.

To use `inferno-component`, very much like React, you create a `class` and extends `Component`:

```jsx
import Inferno from 'inferno';
import Component from 'inferno-component';


class MyComponent extends Component {
	render() {
		return <div>Hello world</div>;
	}
}

Inferno.render(<MyComponent />, document.getElementById('app'));
```

## ES5 Class Components

Inferno offers ES5 class components as a separate package called `inferno-create-class`, unlike other libraries like React. To install this functionality
you can install via NPM or using the script from the CDN:

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

## Passing down props

### Functional Components

To pass data to a child component you simply add an attribute to the child with the appropriate data. The constructor of the 
child component will then receive the props object containing the appropriate data.

```js
export function App (props){
  const obj = {value: 3} 
  return <MySub title="my title" myObject={obj}></MySub>
}
function MySub(props) {
	return <div>{ props.title } , { props.myObject.value }</div>;
}
```

### Class Components

```js
export class App extends Component {
  obj = {value: 3}
  render() {
    return (
        <MySub title="my title" myObject={this.obj}></MySub>
    );
  }
}

class MySub extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        { this.props.title }
        { this.props.myObject.value }
      </div>
    );
  }
}
```
## Component Lifecycle events

### Functional Components

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
			<td>a functional component has been triggered to updated</td>
			<td><code>lastProps, nextProps</code></td>
		</tr>
		<tr>
			<td><code>onComponentWillUpdate</code></td>
			<td>a functional component is about to perform an update</td>
			<td><code>lastProps, nextProps</code></td>
		</tr>
		<tr>
			<td><code>onComponentDidUpdate</code></td>
			<td>a functional component has performed an updated</td>
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
function mounted(domNode) {
    // [domNode] will be available for DOM nodes and components (if the component has mounted to the DOM)
}

function FunctionalComponent({ props }) {
	return <div>Hello world</div>;
}

Inferno.render(<FunctionalComponent onComponentDidMount={ mounted } />, document.getElementById('app'));
```


### Class Components

Like functional components, ES2015 class components have lifecycle events too. The work exactly like React's class
components do. Below are a list of all the lifecycle events:

<table>
	<thead>
		<tr>
			<th>Lifecycle method</th>
			<th>When it gets called</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>componentWillMount</code></td>
			<td>before the component gets mounted to the DOM</td>
		</tr>
		<tr>
			<td><code>componentDidMount</code></td>
			<td>after the component gets mounted to the DOM</td>
		</tr>
		<tr>
			<td><code>componentWillUnmount</code></td>
			<td>prior to removal from the DOM</td>
		</tr>
		<tr>
			<td><code>componentDidUnmount</code></td>
			<td>after removal from the DOM</td>
		</tr>
		<tr>
			<td><code>componentWillReceiveProps</code></td>
			<td>before new props get accepted</td>
		</tr>
		<tr>
			<td><code>shouldComponentUpdate</code></td>
			<td>before <code>render()</code>. Return <code>false</code> to skip render</td>
		</tr>
		<tr>
			<td><code>componentWillUpdate</code></td>
			<td>before <code>render()</code></td>
		</tr>
		<tr>
			<td><code>componentDidUpdate</code></td>
			<td>after <code>render()</code></td>
		</tr>
	</tbody>
</table>

The below is an example of using the `componentDidMount` lifecycle event to request AJAX data on a component:

```jsx
import Inferno from 'inferno';
import Component from 'inferno-component'
import myAPI from './myAPI';

class AjaxComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	componentDidMount() {
		myAPI.fetch('/item-names').then((data) => {
			this.setState({
				data
			});
		});
	}
	render() {
		return (
			<ul>
				{
					this.state.data.map(data =>
						<li>{  data.name }</li>
					)
				}
			</ul>
		);
	}
}
```


## Inject HTML Helper

`dangerouslySetInnerHTML` is a replacement for using innerHTML. Setting HTML from code is risky because it's easy to inadvertently expose your users to a cross-site scripting (XSS) attack. You can set HTML directly from a component property, but you have to type out dangerouslySetInnerHTML and pass an object with a __html key, to remind yourself that it's dangerous.

```js
function MyComponent() {
  return <div dangerouslySetInnerHTML={ { __html: 'Your content will go here' } } />;
}
```


## Incompose
[Incompose](https://github.com/zanettin/incompose) is a Inferno utility belt for function components and higher-order components.
Inspired by [recompose](https://github.com/acdlite/recompose) for React. Please check the [Github](https://github.com/zanettin/incompose) page for supported functions.

#### Usage example
```js
import {
  default as Inferno,
  linkEvent
} from 'inferno';

import {
  compose,
  withState,
  shouldUpdate
} from 'incompose';

const inc = (props) => {
  props.setCount(props.count += 1);
};

const dec = (props) => {
  props.setCount(props.count -= 1);
};

const Counter = (props) => (
  <div>
    <h1>count : {props.count}</h1>
    <button onClick={linkEvent(props, dec)}>-</button>
    <button onClick={linkEvent(props, inc)}>+</button>
  </div>
);

/**
 * With state creates 2 new props on the component props
 * props.count		-	contains the value (1 is set as default value)
 * props.setCount	-	contains the setter function
 */
const withCounterState = withState('count', 'setCount', 1);

/**
 * Should update prevents the component of re-render (shouldUpdate lifecycle hook).
 * You can compare current and next props and decide whether the component
 * should update or not. In this example, the counter just updates if
 * props.count is even.
 */
const withUpdatePolicy = shouldUpdate((props, nextProps) => (
  nextProps.count % 2 === 0
));

/**
 * With compose all the extendend functions are composed BEFORE Counter
 * gets rendered. Please not that order matters.
 */
export default compose(
  withCounterState,
  withUpdatePolicy,
)(Counter);
```

