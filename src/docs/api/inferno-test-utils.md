# Inferno Test Utils

Suite of utilities for testing Inferno applications. Works harmoniously other test frameworks such as [Jest](https://facebook.github.io/jest/) and [Mocha](https://www.mochajs.org).

**Installation**

```
npm install inferno-test-utils --save-dev
```

**Importing**

```js
var InfernoTestUtils = require('inferno-test-utils') // ES5
import InfernoTestUtils from 'inferno-test-utils'    // ES6
```

### `renderIntoDocument(vNodeTree)`

Renders `vNodeTree` into a detached DOM element in the document and returns a rendered `VNode` tree.

_This function requires a DOM_.

```js
const vNodeTree = (
  <div className="outer">
    <SomeComponent className="inner"/>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
```

### `findAllInRenderedTree(renderedTree, predicate)`

Calls `predicate` with each `VNode` instance in `renderedTree`.

Returns an array of `VNode` instances where `predicate` returns `true`.

```js
const vNodeTree = (
  <div className="outer">
    <SomeComponent className="inner"/>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
const predicate = (vNode) => vNode.type === SomeComponent;
const result = findAllInRenderedTree(renderedTree, predicate);
```

### `findAllInVNodeTree(vNodeTree, predicate)`

Calls `predicate` with each `VNode` instance in `vNodeTree`.

Returns an array of `VNode` instances where `predicate` returns `true`.

```js
const vNodeTree = (
  <div className="outer">
    <SomeComponent className="inner"/>
  </div>
);
const predicate = (vNode) => vNode.type === SomeComponent;
const result = findAllInVNodeTree(vNodeTree, predicate);
```

### `scryRenderedDOMElementsWithClass(renderedTree, classNames)`

Returns an array of DOM elements with `classNames`.

`classNames` can be a space-separated string or an array of strings.

```js
const vNodeTree = (
  <div className="outer">
    <SomeComponent className="inner one"/>
    <SomeComponent className="inner two"/>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
const result1 = scryRenderedDOMElementsWithClass(renderedTree, 'inner');
const result2 = scryRenderedDOMElementsWithClass(renderedTree, 'inner one');
const result3 = scryRenderedDOMElementsWithClass(renderedTree, ['inner', 'two']);
const result4 = scryRenderedDOMElementsWithClass(renderedTree, 'three'); // Empty array
```

### `findRenderedDOMElementWithClass(renderedTree, classNames)`

Returns a single DOM element with `classNames`. If more than one matches are found, throws an error.

`classNames` can be a space-separated string or an array of strings.

```js
const vNodeTree = (
  <div className="outer">
    <SomeComponent className="inner one"/>
    <SomeComponent className="inner two"/>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
const result1 = findRenderedDOMElementWithClass(renderedTree, 'outer');
const result2 = findRenderedDOMElementWithClass(renderedTree, 'inner one');
// Will throw an error because more than 1 matches were found...
const result3 = findRenderedDOMElementWithClass(renderedTree, 'inner');
```

### `scryRenderedDOMElementsWithTag(renderedTree, tagName)`

Returns an array of DOM elements with `tagName`.

```js
const vNodeTree = (
  <div>
    <h1>Heading</h1>
    <p>Paragraph One</p>
    <p>Paragraph Two</p>
    <p>Paragraph Three</p>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
const result1 = scryRenderedDOMElementsWithTag(renderedTree, 'h1');
const result3 = scryRenderedDOMElementsWithTag(renderedTree, 'p');
const result4 = scryRenderedVNodesWithType(renderedTree, 'span'); // Empty array
```

### `findRenderedDOMElementWithTag(renderedTree, tagName)`

Returns a single DOM element with `tagName`. If more than one matches are found, throws an error.

```js
const vNodeTree = (
  <div>
    <h1>Heading</h1>
    <div>
      <p>Paragraph One</p>
      <p>Paragraph Two</p>
      <p>Paragraph Three</p>
    </div>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
const result1 = findRenderedDOMElementWithTag(renderedTree, 'h1');
// Will throw an error because more than 1 matches were found...
const result2 = findRenderedDOMElementWithTag(renderedTree, 'p');
```

### `scryRenderedVNodesWithType(renderedTree, type)`

Returns an array of rendered `VNode` instances with `type`.

```js
const vNodeTree = (
  <div>
    <h1>Heading</h1>
    <SomeComponent/>
    <SomeComponent/>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
const result1 = scryRenderedVNodesWithType(renderedTree, 'h1');
const result2 = scryRenderedVNodesWithType(renderedTree, SomeComponent);
const result3 = scryRenderedVNodesWithType(renderedTree, 'p'); // Empty array
```

### `findRenderedVNodeWithType(renderedTree, type)`

Returns a single rendered `VNode` instance with `type`. If more than one matches are found, throws an error.

```js
const vNodeTree = (
  <div>
    <h1>Heading</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
    <SomeComponent/>
    <AnotherComponent/>
    <AnotherComponent/>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
const result1 = findRenderedVNodeWithType(renderedTree, 'h1');
const result2 = findRenderedVNodeWithType(renderedTree, SomeComponent);
// Will throw an error because more than 1 matches were found...
const result3 = findRenderedVNodeWithType(renderedTree, 'p');
const result4 = findRenderedVNodeWithType(renderedTree, AnotherComponent);
```

### `scryVNodesWithType(vNodeTree, type)`

Returns an array of `VNode` instances with `type`.

```js
const vNodeTree = (
  <div>
    <h1>Heading</h1>
    <SomeComponent/>
    <SomeComponent/>
  </div>
);
const result1 = scryVNodesWithType(vNodeTree, 'h1');
const result2 = scryVNodesWithType(vNodeTree, SomeComponent);
const result3 = scryVNodesWithType(vNodeTree, 'p'); // Empty array
```

### `findVNodeWithType(vNodeTree, type)`

Returns a single `VNode` instance with `type`. If more than one matches are found, throws an error.

```js
const vNodeTree = (
  <div>
    <h1>Heading</h1>
    <SomeComponent/>
    <SomeComponent/>
  </div>
);
const result1 = findVNodeWithType(vNodeTree, 'h1');
// Will throw an error because more than 1 matches were found...
const result2 = findVNodeWithType(vNodeTree, SomeComponent);
```

## Type Checkers

### `isVNode(instance)`

Returns `true` when `instance` is a `VNode`.

### `isVNodeOfType(instance, type)`

Returns `true` when `instance` is a `VNode` of `type`.

### `isDOMVNode(instance)`

Returns `true` when `instance` is a DOM-type `VNode`.

### `isDOMVNodeOfType(instance, type)`

Returns `true` when `instance` is a DOM-type `VNode` of `type`.

### `isFunctionalVNode(instance)`

Returns `true` when `instance` is a functional-type `VNode`.

### `isFunctionalVNodeOfType(instance, type)`

Returns `true` when `instance` is a functional-type `VNode` of `type`.

### `isClassVNode(instance)`

Returns `true` when `instance` is a class-type `VNode`.

### `isClassVNodeOfType(instance, type)`

Returns `true` when `instance` is a class-type `VNode` of `type`.

### `isDOMElement(instance)`

Returns `true` when `instance` is a DOM element.

### `isDOMElementOfType(instance, type)`

Returns `true` when `instance` is a DOM element of `type`.

### `isRenderedClassComponent(instance)`

Returns `true` when `instance` is a rendered class `VNode`.

### `isRenderedClassComponentOfType(instance, type)`

Returns `true` when `instance` is a rendered class `VNode` of `type`.
