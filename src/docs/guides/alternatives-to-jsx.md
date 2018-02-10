# Alternatives to JSX

JSX isn't the only way to create Inferno VNodes. The two supported core packages for created
Inferno VNodes are `inferno-hyperscript` and `inferno-create-element`. They are described below.

## Hyperscript

> [Hyperscript](https://github.com/hyperhype/hyperscript) syntax for [Inferno](https://github.com/trueadm/inferno) templates. Hyperscript is a simple standardized syntax for creating VDOMs for use in Inferno.

### Usage

```javascript
import { h } from 'inferno-hyperscript';

module.exports = function ExampleComponent(props) {
  return h('.example', [
    h('a.example-link', {
      href: '#'
    }, [
      'Hello',
      props.whom,
      '!'
    ])
  ]);
}
```

### Documentation

#### `h(componentOrTag, properties, children)`

Returns an Inferno VNode from a Hyperscript representation.

* **componentOrTag** `(Object|String)` can be an Inferno component **OR** tag string with optional CSS class names and ids in the format `h1#some-id.foo.bar`.
  If a tag string, the tag name is parsed out, and the `id` and `className` properties of the `properties` argument will be modified.
* **properties** `(Object)` *(optional)* An object containing the properties you'd like to set on the element.
* **children** `(Array|String)` *(optional)* An array of `h()` children or strings, This will create childen or text nodes respectively.

Documentation: <https://github.com/hyperhype/hyperscript>

## createElement

Alternatively to JSX, you may also create VDOM elements using the `createElement` method. The API is very similar to that that found with React's createElement()

#### `createElement(componentOrTag, properties, [...children])`

Returns an Inferno VNode from calling the method directly.

```js
import { Component, render } from 'inferno';
import { createElement} from 'inferno-create-element';

class BasicComponent extends Component {
  render() {
    const children = createElement('span', { 
      className: this.props.name 
    }, 'The title is ', this.props.title);
    
    return createElement('div', {
      className: 'basic'
    }, children);
  }
}

render(createElement(BasicComponent, { title: 'abc' }), document.getElementById('root'));
```
