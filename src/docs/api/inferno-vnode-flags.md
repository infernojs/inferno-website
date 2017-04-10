# Inferno VNode Flags API

## `VNodeFlags`
 - `.Text`
 - `.HtmlElement`
 - `.ComponentClass`
 - `.ComponentFunction`
 - `.ComponentUnknown`
 - `.HasKeyedChildren`
 - `.HasNonKeyedChildren`
 - `.SvgElement`
 - `.MediaElement`
 - `.InputElement`
 - `.TextareaElement`
 - `.SelectElement`
 - `.Void`

Inferno VNode flags are used to describe what type of element/component the VNode will be. A VNode can be used to describe a
`<div>`, `<h1>`, `<Component>` etc, each of these might have a different flag identity.

You can easily combine multiple flags, by using bitwise operators. A common use case is an element that has keyed children:

```js
const flag = VNodeFlags.HtmlElement | VNodeFlags.HasKeyedChildren;
```

## Example Usage

```js
import Inferno from 'inferno';
import VNodeFlags from 'inferno-vnode-flags';

const vNode = Inferno.createVNode(VNodeFlags.Element, 'div', 'example', 'Hello world!');

Inferno.render(vNode, container);
```
