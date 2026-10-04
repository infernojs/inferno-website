# Inferno VNode Flags API

Inferno VNode Flags is a small utility library for [Inferno](https://github.com/infernojs/inferno).

Usage of `inferno-vnode-flags` should be limited to assigning `VNodeFlags` and `ChildFlags` when using creating vNodes.

## Install

```
npm install --save inferno-vnode-flags
```

## Contents

**VNodeFlags:**

The JSX plugins write the flags into the compiled code as one number, so the flags that compiled apps and Inferno use most have the smallest values. The values changed in Inferno 10, so compile JSX with the v10 plugins.
Never write flag numbers by hand, they can change between major versions. Code compiled with `tsc` against `inferno-vnode-flags` 9 has the old numbers inlined and must be compiled again.

- `VNodeFlags.HtmlElement` (1) vNode type is any generic HTML element
- `VNodeFlags.SvgElement` (64) vNode is html element that belongs to SVG namespace
- `VNodeFlags.ComponentClass` (128) vNode type is class component
- `VNodeFlags.Fragment` (256) vNode type is fragment
- `VNodeFlags.InputElement` (512) vNode type is "input" element
- `VNodeFlags.Text` (1024) vNode type is text
- `VNodeFlags.TextareaElement` (2048) vNode type is "textarea" element
- `VNodeFlags.SelectElement` (4096) vNode type is "select" element
- `VNodeFlags.ComponentFunction` (8192) vNode type is functional component
- `VNodeFlags.Portal` (16384) vNode type is portal
- `VNodeFlags.ForwardRef` (32768) functional component is wrapped in `forwardRef`
- `VNodeFlags.InUse` (65536) vNode has been mounted
- `VNodeFlags.ContentEditable` (131072) element or component has a `contentEditable` prop
- `VNodeFlags.Validated` (262144) development only, the keys of the vNode's children have been validated
- `VNodeFlags.Normalized` (524288) vNode came from the normalization process
- `VNodeFlags.ComponentUnknown` (0) vNode type is Functional or Class component, `newComponentVNode` finds out at runtime whether the type is a class, a function or a forwardRef

`VNodeFlags.ReCreate` (JSX **$ReCreate**) has been removed in Inferno 10. Change the `key` of an element to re-create it.

**ChildFlags in VNodeFlags:**

A vNode keeps the shape of its children in bits of `flags`. Exactly one of these bits is set, test it with `vNode.flags & VNodeFlags.HasKeyedChildren`. `newVNode`, `newComponentVNode` and `newFragment` from `inferno` take the bit in their `flags`, for example `VNodeFlags.HtmlElement | VNodeFlags.HasKeyedChildren`; flags without a child bit make them normalize the children. The deprecated `createVNode` and `createFragment` take a separate `ChildFlags` value, which has the same name as its bit but another value. `getChildFlags(vNode)` from `inferno` converts the bits back to a `ChildFlags` value, for passing them to those.

- `VNodeFlags.HasTextChildren` (2) (JSX **$HasTextChildren**) Children type is only string (fast)
- `VNodeFlags.HasNonKeyedChildren` (4) (JSX **$HasNonKeyedChildren**) Children type is array of vNodes, diff is done based on array indexes, no nested arrays, no holes (fast)
- `VNodeFlags.HasVNodeChildren` (8) (JSX **$HasVNodeChildren**) Children type is single vNode (fast)
- `VNodeFlags.HasInvalidChildren` (16) Children type is invalid/empty "null", "undefined", "false", "true" (fast)
- `VNodeFlags.HasKeyedChildren` (32) (JSX **$HasKeyedChildren**) Children type is array of vNodes, diff is done based on "key" properties all vNodes must have a key, no nested arrays, no holes (fast)

No child bit means the children type is not known compile time, children resolution will be done runtime. This is what the JSX plugins write when JSX contains javascript expression that cannot be resolved compile time. ( slow )

**VNodeFlags Masks:**

- `VNodeFlags.ChildFlagsMask` - Bits that hold the shape of the children
- `VNodeFlags.MultipleChildren` - Mask of the keyed and non-keyed child bits
- `VNodeFlags.ForwardRefComponent` - Functional component wrapped in forward ref
- `VNodeFlags.FormElement` - vNode type is any form element "input", "textarea", "select"
- `VNodeFlags.Element` - vNode type is any element ( not component )
- `VNodeFlags.Component` - vNode type is Component, `ComponentClass | ComponentFunction`
- `VNodeFlags.DOMRef` - Bit set when vNode holds DOM reference
- `VNodeFlags.InUseOrNormalized` - VNode is used somewhere else or came from normalization process
- `VNodeFlags.IgnoredByPatch` - Bits that don't make two vNodes different types: Normalized, ChildFlags and Validated
- `VNodeFlags.ClearOnCopy` - Clears the ChildFlags, Validated, InUse and Normalized bits of flags copied from another vNode, before a new child bit is added

`vNode.flags` has bits for the shape of the children and for Inferno's own state too. Test it with masks and never compare the whole value to a constant.

**ChildFlags**

The shape of the children as the deprecated `createVNode` and `createFragment` take it. These values did not change in Inferno 10.

- `ChildFlags.UnknownChildren` needs Normalization
- `ChildFlags.HasInvalidChildren` is invalid (null, undefined, false, true)
- `ChildFlags.HasVNodeChildren` (JSX **$HasVNodeChildren**) is single vNode (Element/Component)
- `ChildFlags.HasNonKeyedChildren` (JSX **$HasNonKeyedChildren**) is Array of vNodes non keyed (no nesting, no holes)
- `ChildFlags.HasKeyedChildren` (JSX **$HasKeyedChildren**) is Array of vNodes keyed (no nesting, no holes)
- `ChildFlags.HasTextChildren` (JSX **$HasTextChildren**) vNode contains only text

**ChildFlags Masks**

- `ChildFlags.MultipleChildren` Is Array

You can easily combine multiple flags, by using bitwise operators. A common use case is an element that has keyed children:

```js
import { newVNode } from 'inferno';
import { VNodeFlags } from 'inferno-vnode-flags';

const list = newVNode(
  VNodeFlags.HtmlElement | VNodeFlags.HasKeyedChildren,
  'ul',
  null,
  items, // vNodes with keys
);
```

When you create a vNode from the flags of another vNode, clear the copied state first and then add the new child bit:

```js
const flags = (vNode.flags & VNodeFlags.ClearOnCopy) | VNodeFlags.HasTextChildren;
```
