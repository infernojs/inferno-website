# Components

Inferno offers three different types of components to use when building a UI: functional components, ES2015 class components and ES5 class components.

## Functional Components

Functional components are pure functions that represent the "render" functions of traditional ES2015 and ES5 class components.

*Using JSX:*
```js
import Inferno from 'inferno';

function MyComponent(props) {
	return <div>I am a functional component<div>;
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

### Functional Component Lifecycle events

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

## ES2015 Class Components

Inferno offers ES2015 class components as a separate package called `inferno-component`, unlike other libraries like React. To install this functionality
you can install via NPM or using the script from the CDN:

*NPM:*
```sh
npm install --save inferno-component
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno@1.0.3/dist/inferno-component.js"></script>
<script src="https://unpkg.com/inferno@1.0.3/dist/inferno-component.min.js"></script>
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

### Class Lifecycle Events

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

## ES5 Class Components

Inferno offers ES5 class components as a separate package called `inferno-create-class`, unlike other libraries like React. To install this functionality
you can install via NPM or using the script from the CDN:

*NPM:*
```sh
npm install --save inferno-create-class
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno@1.0.3/dist/inferno-create-class.js"></script>
<script src="https://unpkg.com/inferno@1.0.3/dist/inferno-create-class.min.js"></script>
```

Note: `inferno-create-class` works exactly like React's [`React.createClass()`](https://facebook.github.io/react/docs/react-api.html#createclass) API works.
