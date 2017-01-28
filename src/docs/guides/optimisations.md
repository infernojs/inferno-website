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
