# Inferno VNode Flags

## `VNodeFlags.Text`
## `VNodeFlags.HtmlElement`
## `VNodeFlags.ComponentClass`
## `VNodeFlags.ComponentFunction`
## `VNodeFlags.ComponentUnknown`
## `VNodeFlags.HasKeyedChildren`
## `VNodeFlags.HasNonKeyedChildren`
## `VNodeFlags.SvgElement`
## `VNodeFlags.MediaElement`
## `VNodeFlags.InputElement`
## `VNodeFlags.TextareaElement`
## `VNodeFlags.SelectElement`
## `VNodeFlags.Void`

Inferno VNode flags are used to describe what type of elmenent/component the VNode will be. A VNode can be used to describe a
`<div>`, `<h1>`, `<Component>` etc, each of these might have a different flag identity.

You can easily combine multiple flags, by using bitwise operators. A common use case is an element that has keyed children:

```js
const flag = VNodeFlags.HtmlElement | VNodeFlags.HasKeyedChildren;
```

## Example Usage

```js
import Inferno from 'inferno';
import VNodeFlags from 'inferno-vnode-flags';

const vNode = Inferno.createVNode(VNodeFlags.Element, 'div', { className: 'example' }, 'Hello world!');

Inferno.render(vNode, container);
```
