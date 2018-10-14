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

### `createVNode` (package: `inferno`)
```js
Inferno.createVNode(
  flags,
  type,
  [className],
  [...children],
  [childFlags],
  [props],
  [key],
  [ref]
)
```

createVNode is used to create html element's virtual node object. Typically `createElement()` (package: `inferno-create-element`), `h()` (package: `inferno-hyperscript`) or JSX are used to create
`VNode`s for Inferno, but under the hood they all use `createVNode()`. Below is an example of `createVNode` usage:

```javascript
import { VNodeFlags, ChildFlags } from 'inferno-vnode-flags';
import { createVNode, createTextVNode, render } from 'inferno';

const vNode = createVNode(VNodeFlags.HtmlElement, 'div', 'example', createTextVNode('Hello world!'), ChildFlags.HasVNodeChildren);

// <div class="example">Hello world!</div>

render(vNode, container);
```

`createVNode` arguments explained:

`flags`: (number) is a value from [`VNodeFlags`](https://github.com/infernojs/inferno/tree/master/packages/inferno-vnode-flags), this is a numerical value that tells Inferno what the VNode describes on the page.

`type`: (string) is tagName for element for example 'div'

`className`: (string) is the class attribute ( it is separated from props because it is the most commonly used property )

`children`: (vNode[]|vNode) is one or array of vNodes to be added as children for this vNode

`childFlags`: (number) is a value from [`ChildFlags`](https://github.com/infernojs/inferno/tree/master/packages/inferno-vnode-flags), this tells inferno shape of the children so normalization process can be skipped.

`props`: (Object) is object containing all other properties. fe: `{onClick: method, 'data-attribute': 'Hello Community!}`

`key`: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.

`ref`: (function) callback which is called when DOM node is added/removed from DOM.


### `createComponentVNode` (package: 'inferno')
```js
Inferno.createComponentVNode(
  flags,
  type,
  [props],
  [key],
  [ref]
)
```

createComponentVNode is used for creating vNode for Class/Functional Component.

Example:
```javascript
import { VNodeFlags, ChildFlags } from 'inferno-vnode-flags';
import { createVNode, createTextVNode, createComponentVNode, render } from 'inferno';

function MyComponent(props, context) {
  return createVNode(VNodeFlags.HtmlElement, 'div', 'example', createTextVNode(props.greeting), ChildFlags.HasVNodeChildren);
}

const vNode = createComponentVNode(VNodeFlags.ComponentFunction, MyComponent, {
  greeting: 'Hello Community!'
}, null, {
  onComponentDidMount() {
    console.log("example of did mount hook!")
  }
})

// <div class="example">Hello Community!</div>

render(vNode, container);
```


`createComponentVNode` arguments explained:

`flags`: (number) is a value from [`VNodeFlags`](https://github.com/infernojs/inferno/tree/master/packages/inferno-vnode-flags), this is a numerical value that tells Inferno what the VNode describes on the page.

`type`: (Function/Class) is the class or function prototype for Component

`props`: (Object) properties passed to Component, can be anything

`key`: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.

`ref`: (Function|Object) this property is object for Functional Components defining all its lifecycle methods. For class Components this is function callback for ref.



### `createTextVNode` (package: 'inferno')

createTextVNode is used for creating vNode for text nodes.

`createTextVNode` arguments explained:
text: (string) is a value for text node to be created.
key: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.

```js
Inferno.createTextVNode(
  text,
  key
)
```


### `cloneVNode` (package: `inferno`)
```javascript
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
import { cloneVNode, createVNode, render } from 'inferno';
import { VNodeFlags } from 'inferno-vnode-flags';

const vNode = createVNode(VNodeFlags.HtmlElement, 'div', 'example', 'Hello world!');
const newVNode = cloneVNode(vNode, { id: 'new' }); // we are adding an id prop to the VNode

render(newVNode, container);
```

If you're using JSX:

```jsx
import { render, cloneVNode } from 'inferno';

const vNode = <div className="example">Hello world</div>;
const newVNode = cloneVNode(vNode, { id: 'new' }); // we are adding an id prop to the VNode

render(newVNode, container);
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


### `createFragment` (package: `inferno`)

createFragment is the native way to createFragment vNode. `createFragment(children: any, childFlags: ChildFlags, key?: string | number | null)`

`createFragment` arguments explained:

`children`: (Array) Content of fragment vNode, typically array of VNodes

`childFlags`: (number) is a value from [`ChildFlags`](https://github.com/infernojs/inferno/tree/master/packages/inferno-vnode-flags), this tells inferno shape of the children so normalization process can be skipped.

`key`: (string|number) unique key within this vNodes siblings to identify it during keyed algorithm.


Alternative ways to create fragment vNode are:

- Using JSX `<> ... </>`, `<Fragment> .... </Fragment>` or `<Inferno.Fragment> ... </Inferno.Fragment>`
- Using createElement API `createElement(Inferno.Fragment, {key: 'test'}, ...children)`
- Using hyperscript API `h(Inferno.Fragment, {key: 'test'}, children)`


In the below example both fragments are identical except they have different key
```jsx
import { Fragment, render, createFragment } from 'inferno';
import { ChildFlags } from 'inferno-vnode-flags';

function Foobar() {
    return (
      <div $HasKeyedChildren>
        {createFragment(
            [<div>Ok</div>, <span>1</span>],
            ChildFlags.HasNonKeyedChildren,
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
This feature has been moved from inferno to inferno-compat in v6. No options are needed anymore.

Note: we recommend using a `ref` callback on a component to find its instance, rather than using `findDOMNode()`. `findDOMNode()` cannot be used on functional components.

If a component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements.
In most cases, you can attach a ref to the DOM node and avoid using `findDOMNode()` at all. When render returns null or false, `findDOMNode()` returns null.
If Component has rendered fragment it returns the first element.
