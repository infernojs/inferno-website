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

Inferno VNode-Flags werden genutzt, um zu beschreiben welchen Element-/Komponenten-Typ ein VNode annehmen wird. Ein VNode kann genutzt werden um ein `<div>`, `<h1>`, `<Component>`, usw. zu beschreiben. Jedes der Genannten können unterschiedliche Identitäts-Flags haben.

Mehrere Flags können mit der Bit-weise Operation kombiniert werden. Ein gängiger Anwendungsfall ist ein Element, welches gekennzeichnete Kind-Elemente hat:

```js
const flag = VNodeFlags.HtmlElement | VNodeFlags.HasKeyedChildren;
```

## Beispiel

```js
import Inferno from 'inferno';
import VNodeFlags from 'inferno-vnode-flags';

const vNode = Inferno.createVNode(VNodeFlags.Element, 'div', 'example', 'Hello world!');

Inferno.render(vNode, container);
```
