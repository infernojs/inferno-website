# Inferno Test Utils

**Importing**

```javascript
import InfernoTestUtils from 'inferno-test-utils' // ES6
var InfernoTestUtils = require('inferno-test-utils') // ES5 with npm
var InfernoTestUtils = Inferno.TestUtils; // ES5 with inferno-with-addons.js
```

## Overview

`InfernoTestUtils` makes it easy to test Inferno component in the test framework of your choice. Facebook use [Jest](https://facebook.github.io/jest/) which can be learned through the Jest website's [React Tutorial](http://facebook.github.io/jest/docs/tutorial-react.html#content), but Inferno core uses [Mocha](https://www.mochajs.org).

> Note:
>
> Airbnb has released a testing utility called Enzyme for React, currently this is does not support Inferno, but support is in the work. If you're interested in helping bring support, it's worth checking out: [http://airbnb.io/enzyme/](http://airbnb.io/enzyme/)

 - [`renderIntoDocument()`](#renderintodocument)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)

### Shallow Rendering

Shallow Rendering is currently not supported in Inferno. 

* * *

## Reference

* * *

### `renderIntoDocument()`

```javascript
renderIntoDocument(
  element: VNode
): VNode
```

Render a Inferno element into a detached DOM node in the document. **This function requires a DOM.**

> Note:
>
> You will need to have `window`, `window.document` and `window.document.createElement` globally available **before** you import `Inferno`.

* * *

### `mockComponent()`

```javascript
mockComponent(
  componentClass,
  mockTagName?: string
)
```

Pass a mocked component module to this method to augment it with useful methods that allow it to be used as a dummy Inferno component. Instead of rendering as usual, the component will become a simple `<div>` (or other tag if `mockTagName` is provided) containing any provided children.

* * *

### `isElement()`

```javascript
isElement(element: VNode): boolean
```

Returns `true` if `element` is any Inferno element.

* * *

### `isElementOfType()`

```javascript
isElementOfType(inst: VNode, componentClass: Function): boolean
```

Returns `true` if `element` is a Inferno element whose type is of a Inferno `componentClass`.

* * *

### `isDOMComponent()`

```javascript
isDOMComponent(inst: any): boolean
```

Returns `true` if `instance` is a DOM component (such as a `<div>` or `<span>`).

* * *

### `isCompositeComponent()`

```javascript
isCompositeComponent(inst): boolean
```

Returns `true` if `instance` is a user-defined component, such as a class or a function.

* * *

### `isCompositeComponentWithType()`

```javascript
isCompositeComponentWithType(inst, type: Function): boolean
```

Returns `true` if `instance` is a component whose type is of a Inferno `componentClass`.

* * *

### `findAllInRenderedTree()`

```javascript
findAllInRenderedTree(
  inst: any,
  test: Function
): VNode[]
```

Traverse all components in `tree` and accumulate all components where `test(component)` is `true`. This is not that useful on its own, but it's used as a primitive for other test utils.

* * *

### `scryRenderedDOMComponentsWithClass()`

```javascript
scryRenderedDOMComponentsWithClass(
  root: VNode,
  classNames: string | string[]
): VNode[]
```

Finds all DOM elements of components in the rendered tree that are DOM components with the class name matching `className`.

* * *

### `findRenderedDOMComponentWithClass()`

```javascript
findRenderedDOMComponentsWithClass(
  root: VNode,
  classNames: Function
): VNode
```

Like [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

* * *

### `scryRenderedDOMComponentsWithTag()`

```javascript
scryRenderedDOMComponentsWithTag(
  root: VNode, 
  tagName: string
): VNode[]
```

Finds all DOM elements of components in the rendered tree that are DOM components with the tag name matching `tagName`.

* * *

### `findRenderedDOMComponentWithTag()`

```javascript
findenderedDOMComponentsWithTag(
  root: VNode,
  tagName: Function
): VNode
```

Like [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

* * *

### `scryRenderedComponentsWithType()`

```javascript
scryRenderedComponentsWithType(
  root: VNode,
  componentType: Function
): VNode[]
```

Finds all instances of components with type equal to `componentClass`.

* * *

### `findRenderedComponentWithType()`

```javascript
findRenderedComponentWithType(
  root: VNode,
  componentClass: Function
): VNode
```

Same as [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.
