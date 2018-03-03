# Community Libraries

There is a growing list of native Inferno libraries available. Some of them can be found in this list.

- [Incompose](#incompose)
- [inferno-animation](#inferno-animation)
- [inferno-bootstrap](#inferno-bootstrap)
- [inferno-popper](#inferno-popper)

Many React libraries can be used with Inferno by including `inferno-compat`. If you maintain an Inferno-library, please feel free to submit a pull request so it can be included in this list.

## Incompose<a name="incompose" />
[Incompose](https://github.com/zanettin/incompose) is an Inferno utility belt for functional components and higher-order components.
Inspired by [recompose](https://github.com/acdlite/recompose) for React. Please check the [Github](https://github.com/zanettin/incompose) page for supported functions.

#### Usage example
```jsx
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

## inferno-bootstrap<a name="inferno-bootstrap" />
Inferno components for Bootstrap 4. Ported from Reactstrap with some modifications.

View component docs [https://jhsware.github.io/inferno-bootstrap-docs/]()

Github repos: [https://github.com/jhsware/inferno-bootstrap]()

### Installation
```
$ npm install --save-prod inferno-bootstrap bootstrap@4
```

### Example
```jsx
import { Card, CardImg, CardBody, CardLink, CardSubtitle, CardText, CardTitle, Button } from 'inferno-bootstrap'

<Card>
  <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
  <CardBody>
    <CardTitle>Card title</CardTitle>
    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
    <Button>Button</Button>
  </CardBody>
</Card>
```

## inferno-animation<a name="inferno-animation" />
Library to animate Inferno components on mount and dismount. Also supports cross-fade, where height and/or
width animates from source size to target size.

This lib allows you to animate all css-properties including width and height using css-animations.
Timeouts are automatically calculated based on the provided CSS rules.

You can animate your components by adding the animation helpers to `componentDidMount` and `componentWillUnmoun` 
or by wrapping your component in the `<Animated />` component.

Currently tested on (polyfills from https://polyfill.io):
- Chrome/FF/Safari (latest) on macOS 10.12 (Sierra)
- IE10/IE11 on Windows 7
- Edge on Windows 10

Repos: [https://github.com/jhsware/inferno-animation]()

### Installation
```
$ npm install --save-prod inferno-animation
```

### Example
```jsx
import { Animated } from 'inferno-animation'

<Animated key={...} prefix="PageAnimation">
  <MyListItem />
</Animated>
```

## inferno-popper<a name="inferno-popper" />
Inferno wrapper around [PopperJS](https://github.com/FezVrasta/popper.js/) ported from [react-popper](https://github.com/souporserious/react-popper).

Repos: [https://github.com/jhsware/inferno-popper]()

### Installation
```
$ npm install --save-prod inferno-popper
```

### Example
```jsx
import { Manager, Target, Popper, Arrow } from 'inferno-popper'

const PopperExample = () => (
  <Manager>
    <Target style={{ width: 120, height: 120, background: '#b4da55' }}>
      Target Box
    </Target>
    <Popper placement="left" className="popper">
      Left Content
      <Arrow className="popper__arrow"/>
    </Popper>
    <Popper placement="right" className="popper">
      Right Content
      <Arrow className="popper__arrow"/>
    </Popper>
  </Manager>
)
```