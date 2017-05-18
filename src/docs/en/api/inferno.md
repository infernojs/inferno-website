# Inferno API

## `render`

```javascript
import Inferno from 'inferno';

const root = document.getElementById('root')

Inferno.render(<div />, root);
```

Render a virtual node into the DOM in the supplied container given the supplied virtual DOM. If the virtual node was previously rendered
into the container, this will perform an update on it and only mutate the DOM as necessary, to reflect the latest Inferno virtual node.

Warning: If the container element is not empty before rendering, the content of the container will be overwritten on the initial render.

## `createRenderer`

`createRenderer` allows for functional composition when rendering content to the DOM. Example:

```javascript
import Inferno from 'inferno';
import { scan, map } from 'most';

...
const model$ = scan(update, 0, actions$);
const vNodes$ = map(view(actions$), model$);
const renderer = Inferno.createRenderer();
const runApp = () => scan(renderer, container, vNodes$).drain();

runApp();
```

## `createElement`

Creates an Inferno VNode using a similar API to that found with React's `createElement()`

```javascript
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

const root = document.getElementById('root')

class BasicComponent extends Component {
    render() {
        return createElement('div', {
               className: 'basic'
           },
           createElement('span', {
               className: this.props.name
           }, 'The title is ', this.props.title)
       )
    }
}

Inferno.render(createElement(BasicComponent, { title: 'abc' }), root);
```

## `Component`

**Class component:**

```javascript
import Component from 'inferno-component';

class MyComponent extends Component {
  render() {
    ...
  }
}
```

This is the base class for Inferno Components when they're defined using ES6 classes.

**Functional component:**

```javascript
import Inferno from 'inferno';

const MyComponent = ({ name, age }) => (
  <span>My name is: { name } and my age is: {age}</span>
);
```

Functional components are first-class functions where their first argument is the `props` passed through from their parent.

## `createVNode`
```js
Inferno.createVNode(
  flags,
  type,
  className,
  [...children],
  [props],
  [key],
  [ref],
  [isNormalized]
)
```

Create a new Inferno `VNode` using `createVNode()`. A `VNode` is a virtual DOM object that is used to
describe a single element of the UI. Typically `createElement()` (package: `inferno-create-element`), `h()` (package: `inferno-hyperscript`) or JSX are used to create
`VNode`s for Inferno, but under the hood they all use `createVNode()`. Below is an example of using
of `createVNode` usage:

```javascript
import Inferno from 'inferno';

const vNode = Inferno.createVNode(2, 'div', 'example', 'Hello world!');

Inferno.render(vNode, container);
```

The first argument for `createVNode()` is a value from [`VNodeFlags`](https://github.com/trueadm/inferno/tree/master/packages/inferno-vnode-flags), this is a numerical value that tells Inferno what the VNode describes on the page.

## `cloneVNode`
```js
Inferno.cloneVNode(
  vNode,
  [props],
  [...children]
)
```

Clone and return a new Inferno `VNode` using a `VNode` as the starting point. The resulting `VNode` will have the original `VNode`'s props with the new props merged in shallowly. New children will replace existing children. key and ref from the original `VNode` will be preserved.

`cloneVNode()` is almost equivalent to:
```jsx
<VNode.type {...VNode.props} {...props}>{children}</VNode.type>
```

An example of using `cloneVNode`:

```javascript
import Inferno from 'inferno';

const vNode = Inferno.createVNode(2, 'div', 'example', 'Hello world!');
const newVNode = Inferno.cloneVNode(vNode, { id: 'new' }); // we are adding an id prop to the VNode

Inferno.render(newVNode, container);
```

If you're using JSX:

```jsx
import Inferno from 'inferno';

const vNode = <div className="example">Hello world</div>;
const newVNode = Inferno.cloneVNode(vNode, { id: 'new' }); // we are adding an id prop to the VNode

Inferno.render(newVNode, container);
```

## `findDOMNode`

Once enabled via `options.findDOMNodeEnabled()` at the start of an application, `findDOMNode()` is enabled.

Note: we recommend using a `ref` callback on a component to find its instance, rather than using `findDOMNode()`. `findDOMNode()` cannot be used on functional components and it introduces a significant performance impact.

If a component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements.
In most cases, you can attach a ref to the DOM node and avoid using `findDOMNode()` at all. When render returns null or false, `findDOMNode()` returns null.

## `linkEvent`

`linkEvent()` is a helper function that allows attachment of `props`/`state`/`context` or other data to events without needing to `bind()` them or use arrow functions/closures. This is extremely useful when dealing with events in functional components. Below is an example:

```jsx
import Inferno, { linkEvent } from 'inferno';

function handleClick(props, event) {
	props.validateValue(event.target.value);
}

function MyComponent(props) {
	return <div><input type="text" onClick={ linkEvent(props, handleClick) } /><div>;
}
```

This is an example of using it with ES2015 classes:


```jsx
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

function handleClick(instance, event) {
	instance.setState({ data: event.target.value });
}

class MyComponent extends Component {
	render () {
		return <div><input type="text" onClick={ linkEvent(this, handleClick) } /><div>;
	}
}
```

`linkEvent()` offers better performance than binding an event in a class constructor and using arrow functions, so use it where possible.

# Inferno Options

You can set default options for Inferno using `Inferno.options`. Below are the following options:

### - `findDOMNodeEnabled`

***Default: `false`***

This enables `findDOMNode()`. We strongly recommend against using this API as it introduces a significant impact to performance. In the future this API command will be removed, along with `findDOMNode()`;

### - `recyclingEnabled`

***Default: `true`***

This enables DOM node recycling within Inferno, so that DOM nodes are re-used upon disposal. It can have significant performance benefits, but may also cause side-effects with custom elements.
