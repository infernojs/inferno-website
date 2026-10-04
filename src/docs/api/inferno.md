# Inferno API

### `render` (package: `inferno`)

```javascript
import { render } from 'inferno';

render(<div />, document.getElementById("app"));
```

Render a virtual node into the DOM in the supplied container given the supplied virtual DOM. If the virtual node was previously rendered
into the container, this will perform an update on it and only mutate the DOM as necessary, to reflect the latest Inferno virtual node.

Warning: If the container element is not empty before rendering, the content of the container will be overwritten on the initial render.

### `createRenderer` (package: `inferno`)

`createRenderer` creates an alternative render function with a signature matching that of the first argument passed to a reduce/scan function. This allows for easier integration with reactive programming libraries, like [RxJS](https://github.com/ReactiveX/rxjs) and [Most](https://github.com/cujojs/most).

```javascript
import { createRenderer } from 'inferno';
import { scan, map } from 'most';

const renderer = createRenderer();


// NOTE: vNodes$ represents a stream of virtual DOM node updates
scan(renderer, document.getElementById("app"), vNodes$);
```

See [inferno-most-fp-demo](https://github.com/joshburgess/inferno-most-fp-demo) for an example of how to build an app architecture around this.

### `createElement` (package: `inferno-create-element`)

Creates an Inferno VNode using a similar API to that found with React's `createElement()`

```javascript
import { Component, render } from 'inferno';
import { createElement } from 'inferno-create-element';

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

render(
  createElement(BasicComponent, { title: 'abc' }),
  document.getElementById("app")
);
```

### `Component` (package: `inferno`)

**Class component:**

```javascript
import { Component } from 'inferno';

class MyComponent extends Component {
  render() {
    ...
  }
}
```

This is the base class for Inferno Components when they're defined using ES6 classes.

Since Inferno 10, `Component` is a native class in every bundle. Compile your own components to ES2015 or newer. A component class that calls `Component` as an ES5 function, such as TypeScript's `target: "ES5"` output, throws `TypeError: Class constructor Component cannot be invoked without 'new'`.

**Functional component:**

```javascript
const MyComponent = ({ name, age }) => (
  <span>My name is: { name } and my age is: {age}</span>
);
```

Another way of using defaultHooks.
```javascript
export function Static() {
    return <div>1</div>;
}

Static.defaultHooks = {
    onComponentShouldUpdate() {
        return false;
    }
};
```

Functional components are first-class functions where their first argument is the `props` passed through from their parent.

### `newVNode` (package: `inferno`)

```js
import { newVNode } from 'inferno';

newVNode(flags, type, [className], [children], [props], [key], [ref]);
```

newVNode is used to create html element's virtual node object. Typically `createElement()` (package: `inferno-create-element`), `h()` (package: `inferno-hyperscript`) or JSX are used to create
`VNode`s for Inferno, but under the hood they all use `newVNode()`. Below is an example of `newVNode` usage:

```javascript
import { VNodeFlags } from 'inferno-vnode-flags';
import { newVNode, newTextVNode, render } from 'inferno';

const vNode = newVNode(
  VNodeFlags.HtmlElement | VNodeFlags.HasVNodeChildren,
  'div',
  'example',
  newTextVNode('Hello world!'),
);

// <div class="example">Hello world!</div>

render(vNode, container);
```

`newVNode` arguments explained:

`flags`: (number) is a value from [`VNodeFlags`](/docs/api/inferno-vnode-flags), this is a numerical value that tells Inferno what the VNode describes on the page. It also tells the shape of the children with one of the child bits: `VNodeFlags.HasInvalidChildren`, `HasVNodeChildren`, `HasNonKeyedChildren`, `HasKeyedChildren` or `HasTextChildren`. Then the normalization process is skipped. Flags without a child bit mean the shape of the children is unknown, and the children are normalized.

`type`: (string) is tagName for element for example 'div'

`className`: (string) is the class attribute ( it is separated from props because it is the most commonly used property )

`children`: (vNode[]|vNode) is one or array of vNodes to be added as children for this vNode

`props`: (Object) is object containing all other properties. fe: `{onClick: method, 'data-attribute': 'Hello Community!'}`

`key`: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.

`ref`: (function) callback which is called when DOM node is added/removed from DOM.


### `newComponentVNode` (package: 'inferno')

```js
import { newComponentVNode } from 'inferno';

newComponentVNode(flags, type, [props], [key], [ref]);
```

newComponentVNode is used for creating vNode for Class/Functional Component.

Example:
```javascript
import { VNodeFlags } from 'inferno-vnode-flags';
import { newVNode, newTextVNode, newComponentVNode, render } from 'inferno';

function MyComponent(props, context) {
  return newVNode(
    VNodeFlags.HtmlElement | VNodeFlags.HasVNodeChildren,
    'div',
    'example',
    newTextVNode(props.greeting),
  );
}

const vNode = newComponentVNode(
  VNodeFlags.ComponentFunction | VNodeFlags.HasInvalidChildren,
  MyComponent,
  {
    greeting: 'Hello Community!',
  },
  null,
  {
    onComponentDidMount() {
      console.log('example of did mount hook!');
    },
  },
);

// <div class="example">Hello Community!</div>

render(vNode, container);
```


`newComponentVNode` arguments explained:

`flags`: (number) is a value from [`VNodeFlags`](/docs/api/inferno-vnode-flags), this is a numerical value that tells Inferno what the VNode describes on the page. `VNodeFlags.ComponentUnknown` lets Inferno find out whether `type` is a class, a function or a forwardRef. `VNodeFlags.ComponentClass` and `VNodeFlags.ComponentFunction` must be combined with `VNodeFlags.HasInvalidChildren`, because a component vNode has no children of its own.

`type`: (Function/Class) is the class or function prototype for Component

`props`: (Object) properties passed to Component, can be anything

`key`: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.

`ref`: (Function|Object) this property is object for Functional Components defining all its lifecycle methods. For class Components this is function callback for ref.



### `newTextVNode` (package: 'inferno')

newTextVNode is used for creating vNode for text nodes.

`newTextVNode` arguments explained:
text: (string) is a value for text node to be created. `null`, `undefined` and booleans become an empty string.
key: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.

```js
import { newTextVNode } from 'inferno';

newTextVNode(text, key);
```


### Deprecated `createVNode`, `createComponentVNode`, `createTextVNode` and `createFragment` (package: 'inferno')

These factories still work for code that creates vNodes by hand, but they are deprecated since Inferno 10. The v10 JSX plugins call the new factories; they call `createVNode` and `createFragment` only for a `$ChildFlag` that is known at runtime. The deprecated factories take a separate `childFlags` value, turn it into its child bit and call the new factories:

<table>
  <thead>
    <tr><th>Deprecated</th><th>Replacement</th></tr>
  </thead>
  <tbody>
    <tr><td><code>createVNode(flags, type, className, children, ChildFlags.HasTextChildren, ...)</code></td><td><code>newVNode(flags | VNodeFlags.HasTextChildren, type, className, children, ...)</code></td></tr>
    <tr><td><code>createComponentVNode(flags, type, props, key, ref)</code></td><td><code>newComponentVNode(flags | VNodeFlags.HasInvalidChildren, type, props, key, ref)</code></td></tr>
    <tr><td><code>createTextVNode(text, key)</code></td><td><code>newTextVNode(text, key)</code></td></tr>
    <tr><td><code>createFragment(children, ChildFlags.HasKeyedChildren, key)</code></td><td><code>newFragment(VNodeFlags.Fragment | VNodeFlags.HasKeyedChildren, children, key)</code></td></tr>
  </tbody>
</table>

Each `ChildFlags` value has a `VNodeFlags` child bit of the same name, for example `ChildFlags.HasTextChildren` becomes `VNodeFlags.HasTextChildren`. `ChildFlags.UnknownChildren` becomes no child bit.

`createVNode` and `createFragment` treat an omitted `childFlags` as `ChildFlags.HasInvalidChildren`, so they ignore the children. Flags without a child bit make `newVNode` and `newFragment` normalize the children instead.

`vNode.childFlags` has been removed in Inferno 10. Test the child bits of `vNode.flags` instead, for example `(vNode.flags & VNodeFlags.HasKeyedChildren) !== 0`, or use `getChildFlags(vNode)` (package: `inferno`) to get the `ChildFlags` value for passing it on to a deprecated factory.


### `cloneVNode` (package: `inferno-clone-vnode`)

This package has same API as `React.cloneElement`

```javascript
import { cloneVNode } from 'inferno-clone-vnode';

cloneVNode(
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
import { newVNode, render } from 'inferno';
import { cloneVNode } from 'inferno-clone-vnode';
import { VNodeFlags } from 'inferno-vnode-flags';

const vNode = newVNode(VNodeFlags.HtmlElement | VNodeFlags.HasTextChildren, 'div', 'example', 'Hello world!');
const clone = cloneVNode(vNode, { id: 'new' }); // we are adding an id prop to the VNode

render(clone, container);
```

If you're using JSX:

```jsx
import { render } from 'inferno';
import { cloneVNode } from 'inferno-clone-vnode';

const vNode = <div className="example">Hello world</div>;
const clone = cloneVNode(vNode, { id: 'new' }); // we are adding an id prop to the VNode

render(clone, container);
```

### `createPortal` (package: 'inferno')

HTML:
```html
<div id="root"></div>
<div id="outside"></div>
```

Javascript:
```jsx
const { render, Component, version, createPortal } from 'inferno';

function Outsider(props) {
	return <div>{`Hello ${props.name}!`}</div>;
}

const outsideDiv = document.getElementById('outside');
const rootDiv = document.getElementById('root');

function App() {
	return (
  	    <div>
    	    Main view
            ...
            {createPortal(<Outsider name="Inferno" />, outsideDiv)}
        </div>
    );
}


// render an instance of Clock into <body>:
render(<App />, rootDiv);
```

Results into:
```html
<div id="root">
    <div>Main view ...</div>
</div>
<div id="outside">
    <div>Hello Inferno!</div>
</div>
```
Cool huh? Updates (props/context) will flow into "Outsider" component from the App component the same way as any other Component.
For inspiration on how to use it click [here](https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202)!


### `createRef` (package: `inferno`)

createRef API provides shorter syntax than callback ref when timing of element is not needed.

```jsx
import { Component, render, createRef } from 'inferno';

class Foobar extends Component {
  constructor(props) {
    super(props);

    // Store reference somewhere
    this.element = createRef(); // Returns object {current: null}
  }

  render() {
    return (
      <div>
        <span id="span" ref={this.element}>
          Ok
        </span>
      </div>
    );
  }
}

render(<Foobar />, container);
```


### `newFragment` (package: `inferno`)

newFragment is the native way to create a Fragment vNode. `newFragment(flags: VNodeFlags, children: any, key?: string | number | null)`

`newFragment` arguments explained:

`flags`: (number) is `VNodeFlags.Fragment` combined with one of the child bits of [`VNodeFlags`](/docs/api/inferno-vnode-flags), this tells inferno shape of the children so normalization process can be skipped. Without a child bit the children are normalized.

`children`: (Array) Content of fragment vNode, typically array of VNodes

`key`: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.


Alternative ways to create fragment vNode are:

- Using JSX `<> ... </>`, `<Fragment> .... </Fragment>` or `<Inferno.Fragment> ... </Inferno.Fragment>`
- Using createElement API `createElement(Inferno.Fragment, {key: 'test'}, ...children)`
- Using hyperscript API `h(Inferno.Fragment, {key: 'test'}, children)`


In the below example both fragments are identical except they have different key
```jsx
import { Fragment, render, newFragment } from 'inferno';
import { VNodeFlags } from 'inferno-vnode-flags';

function Foobar() {
    return (
      <div $HasKeyedChildren>
        {newFragment(
            VNodeFlags.Fragment | VNodeFlags.HasNonKeyedChildren,
            [<div>Ok</div>, <span>1</span>],
            'key1'
        )}
        <Fragment key="key2">
          <div>Ok</div>
          <span>1</span>
        </Fragment>
      </div>
    );
}

render(<Foobar />, container);
```


### `forwardRef` (package: `inferno`)

forwardRef is a new mechanism to "forward" ref inside a functional Component.
It can be useful if you have simple functional Components and you want to create reference to a specific element inside it.

```jsx
import { forwardRef, Component, render } from 'inferno';

const FancyButton = forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

class Hello extends Component {
  render() {
    return (
      <FancyButton
        ref={btn => {
          if (btn) {
            // btn variable is the button rendered from FancyButton
          }
        }}
      >
        Click me!
      </FancyButton>
    );
  }
}

render(<Hello />, container);
```

### `hydrate` (package: `inferno-hydrate`)

```javascript
import { hydrate } from 'inferno-hydrate';

hydrate(<div />, document.getElementById("app"));
```

Same as `render()`, but is used to hydrate a container whose HTML contents were rendered by `inferno-server`. Inferno will attempt to attach event listeners to the existing markup.

### `options.componentComparator` ( package `inferno`) DEV only

This option can be used during **development** to create custom component comparator method.
This option will be called on every Component update.
It gets two parameters: lastVNode and nextVNode. When it returns `true` lastVNode will be replaced with nextVNode.
If anything else than `true` is returned it falls to normal behavior.

```javascript
import {options} from 'inferno';

options.componentComparator = function (lastVNode, nextVNode) {
    /* custom logic */
    return true; // Replaces lastVNode with nextVNode
}
```

### `findDOMNode` (package: `inferno-extras`)
This feature has been moved from `inferno` to `inferno-extras`. No options are needed anymore.

Note: we recommend using a `ref` callback on a component to find its instance, rather than using `findDOMNode()`. `findDOMNode()` cannot be used on functional components.

If a component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements.
In most cases, you can attach a ref to the DOM node and avoid using `findDOMNode()` at all. When render returns null or false, `findDOMNode()` returns null.
If Component has rendered fragment it returns the first element.
