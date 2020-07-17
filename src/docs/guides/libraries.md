# Community Libraries

There is a growing list of native Inferno libraries available. Some of them can be found in this list.

- [Incompose](#incompose)
- [inferno-animation](#inferno-animation)
- [inferno-bootstrap](#inferno-bootstrap)
- [inferno-popper](#inferno-popper)
- [inferno-fluxible](#inferno-fluxible)
- [inferno-carousel](#inferno-carousel)
- [inferno-particles](#inferno-particles)

Many React libraries can be used with Inferno by including `inferno-compat`. If you maintain an Inferno-library, please feel free to submit a pull request so it can be included in this list.

<a name="incompose"></a>

## Incompose

[Incompose](https://github.com/zanettin/incompose) is an Inferno utility belt for functional components and higher-order components.
Inspired by [recompose](https://github.com/acdlite/recompose) for React. Please check the Github-repos for supported functions.

Github repos: [https://github.com/zanettin/incompose](https://github.com/zanettin/incompose)

#### Usage example

```jsx
import { Inferno, linkEvent } from "inferno";
import { compose, withState, shouldUpdate } from "incompose";

const inc = props => {
  props.setCount((props.count += 1));
};

const dec = props => {
  props.setCount((props.count -= 1));
};

const Counter = props => (
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
const withCounterState = withState("count", "setCount", 1);

/**
 * Should update lets you control the re-rendering of a component (shouldUpdate lifecycle hook).
 * You can compare current and next props and decide whether the component
 * should update or not. In this example, the counter just updates if
 * props.count is even.
 */
const withUpdatePolicy = shouldUpdate(
  (props, nextProps) => nextProps.count % 2 === 0
);

/**
 * With compose all the extendend functions are composed BEFORE Counter
 * gets rendered. Please note that order matters.
 */
export default compose(
  withCounterState,
  withUpdatePolicy
)(Counter);
```

<a name="inferno-bootstrap"></a>

## inferno-bootstrap

Inferno components for Bootstrap 4. Ported from Reactstrap with some modifications.

View component docs [https://jhsware.github.io/inferno-bootstrap-docs/](https://jhsware.github.io/inferno-bootstrap-docs/)

Github repos: [https://github.com/jhsware/inferno-bootstrap](https://github.com/jhsware/inferno-bootstrap)

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

<a name="inferno-animation"></a>

## inferno-animation

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

Repos: [https://github.com/jhsware/inferno-animation](https://github.com/jhsware/inferno-animation)

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

<a name="inferno-popper"></a>

## inferno-popper

Inferno wrapper around [PopperJS](https://github.com/FezVrasta/popper.js/) ported from [react-popper](https://github.com/souporserious/react-popper).

Repos: [https://github.com/jhsware/inferno-popper](https://github.com/jhsware/inferno-popper)

### Installation

```
$ npm install --save-prod inferno-popper
```

### Example

```jsx
import { Manager, Target, Popper, Arrow } from "inferno-popper";

const PopperExample = () => (
  <Manager>
    <Target style={{ width: 120, height: 120, background: "#b4da55" }}>
      Target Box
    </Target>
    <Popper placement="left" className="popper">
      Left Content
      <Arrow className="popper__arrow" />
    </Popper>
    <Popper placement="right" className="popper">
      Right Content
      <Arrow className="popper__arrow" />
    </Popper>
  </Manager>
);
```

<a name="inferno-fluxible"></a>

## inferno-fluxible

A minimalist approach to state management. Smaller, faster, better. A small state management system that supports the idea of asynchronous actions and state persistence out of the box.

- [See online demo](https://aprilmintacpineda.github.io/inferno-fluxible/)
- [See docs at GitHub](https://github.com/aprilmintacpineda/inferno-fluxible)
- [See guides at GitHub](https://github.com/aprilmintacpineda/inferno-fluxible#guide)

inferno-fluxible was previously `inferno-context-api-store`. Please read [migrating from inferno-context-api-store instructions](https://github.com/aprilmintacpineda/inferno-fluxible#migrating-from-inferno-context-api-store) on the [docs](https://github.com/aprilmintacpineda/inferno-fluxible).

### Install

`npm i -s inferno-fluxible fluxible-js redefine-statics-js`

### Initialize store

```jsx
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    user: {
      name: 'Test User'
    },
    state: 'value',
    anotherState: {
      count: 1
    },
    oneMoreState: false
  }
});

// rest of the app.
```

instead of rendering a Provider on top of your app. What you do is before you render your app, you have to call `initializeStore` function.

`initializeStore` function expects an object as the only parameter, the object have a required property called `initialStore` which would be used as the initial value of the store.

There's also the optional property called `persist` which should also be an object containing two required properties:

- `storage` which should be a reference to the storage that would be used to save the store. It must have `getItem` and `setItem` methods. Both methods should be synchronous. Example would be `window.localStorage`. The call to `setItem` is deferred by 200ms, this is to minimize and to improve performance.
- `restore` which should be a function that is synchronous. Restore will be called upon initialization and will receive the `savedStore` as the its only argument. The `savedStore` would be an object containing the states that were previously saved to the storage. It should return an object which would be the states that you want to restore.

Persist feature would only save keys that were returned by `config.persist.restore`. That means, other states that you did not return in that method wouldn't be saved.

##### Example

```js
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    user: null,
    someOtherState: 'value',
    anotherState: {
      value: 'value'
    }
  },
  persist: {
    storage: window.localStorage,
    restore: savedStore => ({
      user: savedStore.user || null
    })
  }
});
```

In the case above, only `user` would be saved and the rest wouldn't be saved.

### Connect your components to the store

```jsx
import { connect } from 'inferno-fluxible';

class MyComponent extends Component {
  handleClick = () => {
    this.props.updateAnotherState({
      count: this.props.anotherState.count + 1
    });
  };

  render() {
    return (
      <div>
        <p>{this.props.user.name}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
}

const mutations = {
  updateAnotherState(store, anotherState) {
    function callback() {
      console.log('called back');
    }

    // callback is optional
    store.updateStore({ anotherState }, callback);
  }
};

export default connect(
  mapStateToProps,
  mutations
)(MyComponent);
```

`mapStateToProps` should be a function that should return the state that you want to be accessible in the connected component. `mutations` should be an object that has methods in it. The methods would be the ones you can call to update a specific part of the store.

Both `mapStateToProps`, `mutations` are optional. That mean you can specify `mutations` but not `mapStateToProps` like so:

```jsx
export default connect(
  undefined,
  mutations
)(MyComponent);
```

Vice versa with `mapStateToProps` like so:

```jsx
export default connect(mapStateToProps)(MyComponent);
```

### Mutations

When you call a mutation, you can provide arguments. Except you have to keep in mind that the first parameter that your function would receive is the object called `store`. The `store` has `getStore` and `updateStore` methods.

##### `store.getStore`

Method which you can call anytime to get the latest `store` at that point of call.

##### `store.updateStore`

Method which you can call anytime to update a specific part of the `store`. It expects an object as the first parameter, the object should contain the states that you want to update.

```jsx
const mutations = {
  updateAnotherState(store, anotherState) {
    store.updateStore({ anotherState });
  }
};
```

In the example code above, when you call `this.props.updateAnotherState`, it would only update `anotherState` key of the store, the rest would remains as they were before the update. The method also expects a function as an optional second parameter that would be called **after** the update but **before** persist (if you use persist).

### getStore module

The `getStore` module is a function that you can call anytime to get the latest store at that point of call.

```jsx
import { getStore } from 'fluxible-js';

function notConnectedToStoreFunc() {
  const store = getStore();
  console.log(store);
  // rest of the code
}
```

### dispatch module

The `dispatch` module is a function that you can use to dispatch actions outside a connected component. It expects a callback function as the first parameter, and other parameters would be passed to the callback function as succeeding arguments.

```jsx
import { dispatch } from 'inferno-fluxible';

function notConnectedToStoreFunc() {
  dispatch(
    (store, param1, param2) => {
      store.updateStore({
        state: 'value'
      });
    },
    'value1',
    'value2'
  );
}
```

## inferno-carousel

Carousel component for InfernoJS.

- [See demo](https://aprilmintacpineda.github.io/inferno-carousel/).
- [See docs at GitHub](https://github.com/aprilmintacpineda/inferno-carousel).

### install

```sh
npm i -s inferno-carousel js-carousel
```

### Usage

On your main entry file:

```jsx
import 'js-carousel';
```

Then, whenever you want to use the component.

```jsx
import InfernoCarousel from 'inferno-carousel';
```

Then:

```jsx
<InfernoCarousel animationSpeed={500} itemDuration={5000}>
  <img src="path-to-image" />
  <img src="path-to-image" />
  <img src="path-to-image" />
  <img src="path-to-image" />
  <img src="path-to-image" />
</InfernoCarousel>
```

You can also specify a `className` for the container of the carousel by providing a `className` prop to it.

- `animationSpeed` is the speed (in terms of milliseconds) of the transition animation.
- `itemDuration` is the amount of time (in terms of milliseconds) it has to wait before transitioning to the next item.

## inferno-particles

Official [tsParticles](https://github.com/matteobruni/tsparticles) Inferno component

### Installation

```shell
npm install inferno-particles
```

or

```shell
yarn add inferno-particles
```

### How to use

#### Code

Example:

```javascript
import Particles from "inferno-particles";

class App extends Component {
  render() {
    return (
      <Particles
        id="tsparticles"
        params={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
                speed: 3,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
    );
  }
}
```

#### Props

- width (`string`): The width of the canvas.
- height (`string`): The height of the canvas.
- options (`object`): The options of the particles instance.
- style (`object`): The style of the canvas element.
- className (`string`): The class name of the canvas wrapper.
- canvasClassName (`string`): the class name of the canvas.
- container (`object`): The instance of the [particles container](https://github.com/matteobruni/tsparticles/wiki/Particles-Container-class)

Find your parameters configuration [here](https://particles.matteobruni.it).

### Demos

The demo website is [here](https://particles.matteobruni.it)

<https://particles.matteobruni.it>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
