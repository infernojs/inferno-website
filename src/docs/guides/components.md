# Components

Inferno offers three different types of components to use when building a UI, functional componentns, ES2015 class components and ES5 class components.

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

### Functional Component Lifeycle events

Lifeycle events for functional components get applied as if they were normal `props`. For example:

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

Inferno.render(<FunctionalComponent onComponentDidMount={ mounted } />, document.body);
```

## ES2015 Class Components

TODO

## ES5 Class Components

TODO