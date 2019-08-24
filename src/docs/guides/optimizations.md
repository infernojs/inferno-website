# Optimizations
This section provides information about Inferno specific optimizations.

## Normalization
Inferno normalises all virtualNodes when created using `createElement` or `hyperscript` API ( due to their isomorphic nature )
or when JSX plugin is not able to resolve children shape compile time. Normalization process can also be forced by setting
childFlags: ChildFlags.UnknownChildren bit.

Normalization will

- flatten arrays
- remove invalid nodes and make them keyed (this makes it possible to render nested arrays)

Because Inferno's virtual nodes are not immutable, they might get mutated during application flow.
Normalization will also clone nodes that have already been rendered once.

It is possible to disable normalization, but the responsibility of providing correct input is shifted to the application level.
By disabling normalization it is possible to achieve 200% - 300% better performance. This number comes from the fact that normalization takes **O(n)** time, where n is number of input nodes.

Normalization can be disabled by defining children shape see: **(inferno-vnode-flags)** - package:

When defining children flags children is/are:

**ChildFlags**
- `ChildFlags.UnknownChildren` needs Normalization
- `ChildFlags.HasInvalidChildren` is invalid (null, undefined, false, true)
- `ChildFlags.HasVNodeChildren` (JSX **$HasVNodeChildren**) is single vNode (Element/Component)
- `ChildFlags.HasNonKeyedChildren` (JSX **$HasNonKeyedChildren**) is Array of vNodes non keyed (no nesting, no holes)
- `ChildFlags.HasKeyedChildren` (JSX **$HasKeyedChildren**) is Array of vNodes keyed (no nesting, no holes)

Also when children shape if pre-defined make sure that:
- `HasKeyedChildren` and `HasNonKeyedChildren` bits are set as needed (this depends on user land implementation see [Lists & keys](/docs/guides/benefits/list-rendering) for more information)
- Children shape must always match children when shape is defined, if children shape is dynamic you can simply switch the bit on/off. Or in JSX use `$ChildFlag={expression}` to set the bit.
- Children structure must always be single level array or single vNode

You can disable normalization per element.

JSX:
```jsx
function StaticComponent(props) {
  // This vNode will fall into runtime normalization process, because shape of chilren is unknown compile time
  return <div>{data}<div>
}
```

```jsx
function StaticComponent(props) {
  // this vNode will not be normalized because children shape is defined
  return <div $HasNonKeyedChildren>{unknown}<div>
}
```

```jsx
function StaticComponent(props) {
  // this vNode will not be normalized because children shape is static and no shape needs to be added
  return <div>Hello world!<div>
}
```

Examples on how to use these optimizations can be found in:

[DBMonster benchmark](https://github.com/infernojs/inferno/blob/master/docs/dbmonster/app.js)

[UIBench benchmark](https://github.com/infernojs/inferno/blob/master/docs/uibench/app.js)

