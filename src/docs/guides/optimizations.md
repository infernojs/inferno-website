# Optimizations
This section provides information about Inferno specific optimizations.

## Normalization
Inferno normalises all virtualNodes when created using `createElement` or `hyperscript` API ( due to their isomorphic nature )
or when JSX plugin is not able to resolve children shape compile time. Normalization process is also used when the flags
of a vNode have no child bit, see [inferno-vnode-flags](/docs/api/inferno-vnode-flags).

Normalization will

- flatten arrays
- remove invalid nodes and make them keyed (this makes it possible to render nested arrays)

Because Inferno's virtual nodes are not immutable, they might get mutated during application flow.
Normalization clones a child only when needed, for example when the same vNode has already been rendered in another position.
Since Inferno 10, a vNode that is referenced outside of render, such as a hoisted vNode, is not cloned when it is rendered again in the same position,
and a component that renders `props.children` does not allocate new vNodes for them on every update.

It is possible to disable normalization, but the responsibility of providing correct input is shifted to the application level.
By disabling normalization it is possible to achieve 200% - 300% better performance. This number comes from the fact that normalization takes **O(n)** time, where n is number of input nodes.

Normalization can be disabled by defining children shape see: **(inferno-vnode-flags)** - package:

The JSX plugins write the shape of the children into the flags of the vNode at compile time when the children are written as JSX.
For children that are only known at runtime, such as `{expression}`, the shape can be defined with special JSX flags.
When defining children flags children is/are:

**Child bits of VNodeFlags**
- no child bit, needs Normalization
- `VNodeFlags.HasInvalidChildren` is invalid (null, undefined, false, true)
- `VNodeFlags.HasVNodeChildren` (JSX **$HasVNodeChildren**) is single vNode (Element/Component)
- `VNodeFlags.HasTextChildren` (JSX **$HasTextChildren**) is bare text. It must be a string. Not a VNode created by `newTextVNode()`.
- `VNodeFlags.HasNonKeyedChildren` (JSX **$HasNonKeyedChildren**) is Array of vNodes non keyed (no nesting, no holes)
- `VNodeFlags.HasKeyedChildren` (JSX **$HasKeyedChildren**) is Array of vNodes keyed (no nesting, no holes)

Also when children shape if pre-defined make sure that:
- `HasKeyedChildren` and `HasNonKeyedChildren` bits are set as needed (this depends on user land implementation see [Lists & keys](/docs/guides/benefits/list-rendering) for more information)
- Children shape must always match children when shape is defined, if children shape is dynamic you can simply switch the bit on/off. Or in JSX use `$ChildFlag={expression}` to set the bit, where the expression is a `ChildFlags` value.
- Children structure must always be single level array or single vNode

Since version 10 the JSX plugins stop the build with an error when the JSX shows that the children cannot have the shape the flag declares, for example `$HasVNodeChildren` on two children or `$HasKeyedChildren` on children without keys.
Children written as `{expression}` are not checked. Flags that the plugin does not need, because the children are already known at compile time, give a "useless flag" warning.

You can disable normalization per element.

JSX:
```jsx
function StaticComponent(props) {
  // This vNode will fall into runtime normalization process, because shape of chilren is unknown compile time
  return <div>{data}</div>
}
```

```jsx
function StaticComponent(props) {
  // this vNode will not be normalized because children shape is defined
  return <div $HasNonKeyedChildren>{unknown}</div>
}
```

```jsx
function StaticComponent(props) {
  // this vNode will not be normalized because children shape is static and no shape needs to be added
  return <div>Hello world!</div>
}
```

Examples on how to use these optimizations can be found in:

[DBMonster benchmark](https://github.com/infernojs/inferno/blob/master/docs/dbmonster/app.js)

[UIBench benchmark](https://github.com/infernojs/inferno/blob/master/docs/uibench/app.js)
