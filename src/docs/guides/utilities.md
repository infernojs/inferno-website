# Utilities

## Incompose
[Incompose](https://github.com/zanettin/incompose) is an Inferno utility belt for functional components and higher-order components.
Inspired by [recompose](https://github.com/acdlite/recompose) for React. Please check the [Github](https://github.com/zanettin/incompose) page for supported functions.

#### Usage example
```js
import { Inferno, linkEvent } from 'inferno';
import { compose, withState, shouldUpdate } from 'incompose';

const inc = (props) => {
  props.setCount(props.count += 1)
};

const dec = (props) => {
  props.setCount(props.count -= 1)
};

const Counter = (props) => (
  <div>
    <h1>count : {props.count}</h1>
    <button onClick={linkEvent(props, dec)}>-</button>
    <button onClick={linkEvent(props, inc)}>+</button>
  </div>
);

/**
 * With state creates 2 new props on the component props
 * props.count    -  contains the value (1 is set as default value)
 * props.setCount  -  contains the setter function
 */
const withCounterState = withState('count', 'setCount', 1);

/**
 * Should update lets you control the re-rendering of a component (shouldUpdate lifecycle hook).
 * You can compare current and next props and decide whether the component
 * should update or not. In this example, the counter just updates if
 * props.count is even.
 */
const withUpdatePolicy = shouldUpdate((props, nextProps) => (
  nextProps.count % 2 === 0
));

/**
 * With compose all the extendend functions are composed BEFORE Counter
 * gets rendered. Please note that order matters.
 */
export default compose(
  withCounterState,
  withUpdatePolicy,
)(Counter);
```

