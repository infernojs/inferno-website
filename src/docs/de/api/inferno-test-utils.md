# Inferno Test Utils

Eine Sammlung von Werkzeugen für Tests von Inferno-Anwendungen. Arbeitet sehr gut mit anderen Test-Frameworks wie [Jest](https://facebook.github.io/jest/) und [Mocha](https://www.mochajs.org) zusammen.

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

Rendert einen `vNodeTree` in einen eigenständiges DOM-Element im Document und gibt einen `VNode` Baum zurück.

_Diese Funktion erfordert einen DOM_.

```js
const vNodeTree = (
  <div className="outer">
    <SomeComponent className="inner"/>
  </div>
);
const renderedTree = renderIntoDocument(vNodeTree);
```

### `findAllInRenderedTree(renderedTree, predicate)`

Ruft die `predicate` Funktion mit jeder `VNode` Instanz des `renderedTree` auf.

Gibt ein Array von `VNode` Instanzen zurück, für alle Fälle in denen `predicate` `true` zurückgegeben hat.

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

Ruft `predicate` Funktion mit jeder `VNode` Instanz in `vNodeTree` auf.

Gibt ein Array von `VNode` Instanzen zurück, bei denen `predicate` `true` zurückgegeben hat.

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

Gibt ein Array von DOM-Elemente mit `classNames` zurück.

`classNames` kann entweder ein space-separierter String oder ein Array von Strings sein.

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
const result4 = scryRenderedDOMElementsWithClass(renderedTree, 'three'); // Leeres Array
```

### `findRenderedDOMElementWithClass(renderedTree, classNames)`

Gibt ein einzelnes DOM-Element mit `classNames` zurück. Wenn mehr als Eins gefunden wird, wird ein Fehler geworfen.

`classNames` kann entweder ein space-separierter String oder ein Array von Strings sein.

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
// Wirft einen Fehler, da mehr als 1 Element gefunden wurde.
const result3 = findRenderedDOMElementWithClass(renderedTree, 'inner');
```

### `scryRenderedDOMElementsWithTag(renderedTree, tagName)`

Gibt ein Array von DOM-Elementen mit `tagName` zurück.

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
const result4 = scryRenderedVNodesWithType(renderedTree, 'span'); // Leeres Array
```

### `findRenderedDOMElementWithTag(renderedTree, tagName)`

Gibt ein einzelnes DOM-Element mit `tagName` zurück. Wenn mehr als Eins gefunden wird, wird ein Fehler geworfen.

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
// Wirft einen Fehler, da mehr als 1 Element gefunden wurde.
const result2 = findRenderedDOMElementWithTag(renderedTree, 'p');
```

### `scryRenderedVNodesWithType(renderedTree, type)`

Gibt ein Array von gerenderten `VNode` Instanzen mit `type` zurück.

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
const result3 = scryRenderedVNodesWithType(renderedTree, 'p'); // Leeres Array
```

### `findRenderedVNodeWithType(renderedTree, type)`

Gibt ein einzelne gerenderte `VNode` Instanz vom `type` zurück. Wenn mehr als Eine gefunden wird, wird ein Fehler geworfen.

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
// Wirft einen Fehler, da mehr als 1 Element gefunden wurde.
const result3 = findRenderedVNodeWithType(renderedTree, 'p');
const result4 = findRenderedVNodeWithType(renderedTree, AnotherComponent);
```

### `scryVNodesWithType(vNodeTree, type)`

Gibt ein Array von `VNode` Instanzen vom `type` zurück.

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
const result3 = scryVNodesWithType(vNodeTree, 'p'); // Leeres Array
```

### `findVNodeWithType(vNodeTree, type)`

Gibt ein einzelne `VNode` Instanz vom `type` zurück. Wenn mehr als Eine gefunden wird, wird ein Fehler geworfen.

```js
const vNodeTree = (
  <div>
    <h1>Heading</h1>
    <SomeComponent/>
    <SomeComponent/>
  </div>
);
const result1 = findVNodeWithType(vNodeTree, 'h1');
// Wirft einen Fehler, da mehr als 1 Element gefunden wurde.
const result2 = findVNodeWithType(vNodeTree, SomeComponent);
```

## Typ-Prüfung

### `isVNode(instance)`

Gibt `true` zurück, wenn `instance` vom Typ `VNode` ist.

### `isVNodeOfType(instance, type)`

Gibt `true` zurück, wenn `instance` ein `VNode` vom Typ `type` ist.

### `isDOMVNode(instance)`

Gibt `true` zurück, wenn `instance` ein DOM-`VNode` ist.

### `isDOMVNodeOfType(instance, type)`

Gibt `true` zurück, wenn `instance` ein DOM-`VNode` vom Typ `type` ist.

### `isFunctionalVNode(instance)`

Gibt `true` zurück, wenn `instance` ein funktionaler `VNode` ist.

### `isFunctionalVNodeOfType(instance, type)`

Gibt `true` zurück, wenn `instance` ein funktionaler `VNode` vom Typ `type` ist.

### `isClassVNode(instance)`

Gibt `true` zurück, wenn `instance` ein Klassen-`VNode` ist.

### `isClassVNodeOfType(instance, type)`

Gibt `true` zurück, wenn `instance` ein Klassen-`VNode` vm Typ `type` ist.

### `isDOMElement(instance)`

Gibt `true` zurück, wenn `instance` DOM-Element ist.

### `isDOMElementOfType(instance, type)`

Gibt `true` zurück, wenn `instance` DOM-Element vom Typ `type` ist.

### `isRenderedClassComponent(instance)`

Gibt `true` zurück, wenn `instance` eine gerenderte `VNode`-Klasse ist.

### `isRenderedClassComponentOfType(instance, type)`

Gibt `true` zurück, wenn `instance` eine gerenderte `VNode`-Klasse vom Typ `type` ist.
