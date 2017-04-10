# Optimisations
This section provides Information about inferno specific optimisations.

## Inferno.NO_OP
`Inferno.NO_OP` is constant string that can be used to optimise the rendering process. NO_OP tells renderer to produce the same result as last time.

In essence NO_OP provides same functionality as `onComponentShouldUpdate` (Functional) or `shouldComponentUpdate` (ES6).
The main difference is that NO_OP can be used inside the component: this makes a strong combination together with functional Component, when the functional Component itself can determine its need to update.

```jsx
import {NO_OP} from 'inferno';

function StaticComponent(props) {
    if (condition) {
        return NO_OP;
    }

    return <div>I am a Static Component<div>;
}
```

In the above example, when condition is true, `StaticComponent` will produce the same output as last time.

## Normalisation
By default Inferno normalises all virtualNodes. By disabling normalisation Inferno moves responsibility of correct input to application level.
Normalisation will flatten arrays, remove invalid nodes and make them keyed. This makes it possible to render nested arrays.
Because Inferno's virtual nodes are not immutable they might get mutated during application flow. Normalisation will clone nodes that have been already rendered once.
Normalisation will also take care of hoisted nodes that are referenced from different places in application. Normalisation will also delete `ref` and `key` properties that should not be visible to application layer.

By disabling normalisation it is possible to achieve 200% - 300% better performance.

Normalisation can be disabled when the following rules are followed:
- `hasKeyedChildren` and `hasNonKeyedChildren` are set as needed (this depends on user land implementation see [Lists & keys](http://localhost:8080/docs/guides/benefits/list-rendering) for more information)
- No invalid nodes are used when node has `keyedChildren`
- No ref / key is read from props
- No longer wrongly created types are converted back to elements, instead it fails runtime
- Children structure must always be single level array or single vNode

When element state is important make sure `hasKeyedChildren` and `keys` are set correctly. Never mix keyed and nonKeyed nodes.
Never hoist nodes and move them around by reference without cloning them. You can disable normalisation per element.

JSX:
```jsx
import {NO_OP} from 'inferno';

function StaticComponent(props) {
    if (condition) {
        return NO_OP;
    }

    return <div noNormalize>I am not normalized<div>;
}
```

Inferno.createVNode:

`Inferno.createVNode(flags: VNodeFlags, type: Type, className: string, children: InfernoChildren, props: Props, key: any, ref: Ref, noNormalize: boolean))`

Complete references:

[DBMonster benchmark](https://github.com/infernojs/inferno/blob/master/benchmarks/dbmonster/app.js)

[UIBench benchmark](https://github.com/infernojs/inferno/blob/master/benchmarks/uibench/app.js)
