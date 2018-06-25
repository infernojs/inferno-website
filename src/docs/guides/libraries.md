# Community Libraries

There is a growing list of native Inferno libraries available. Some of them can be found in this list.

- [Incompose](#incompose)
- [inferno-animation](#inferno-animation)
- [inferno-bootstrap](#inferno-bootstrap)
- [inferno-popper](#inferno-popper)
- [inferno-context-api-store](#inferno-context-api-store)

Many React libraries can be used with Inferno by including `inferno-compat`. If you maintain an Inferno-library, please feel free to submit a pull request so it can be included in this list.

<a name="incompose"></a>
## Incompose
[Incompose](https://github.com/zanettin/incompose) is an Inferno utility belt for functional components and higher-order components.
Inspired by [recompose](https://github.com/acdlite/recompose) for React. Please check the Github-repos for supported functions.

Github repos: [https://github.com/zanettin/incompose](https://github.com/zanettin/incompose)

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

<a name="inferno-context-api-store"></a>
## inferno-context-api-store

Seemless, lightweight, state management library that supports async actions and state persisting out of the box. Inspired by Redux and Vuex. Built on top of [inferno-create-context](https://github.com/kurdin/create-inferno-context).

The file size is 6.8kb transpiled. Not minified. Not compressed. Not uglified.

- [Read the docs](https://github.com/aprilmintacpineda/inferno-context-api-store)
- [See online demo](https://aprilmintacpineda.github.io/inferno-context-api-store/#/)

### Guide

##### Install

```
npm install inferno-context-api-store --save
```

##### The store

The store is simply an object that contains your global states.

```js
export default {
  authUser: null,
  todos: [],
  // other initial states that you need
};
```

##### Set up the Provider

The Provider should be the top level of your app. It's the component that manages the store.

- `@prop {Object} store` - the store that contains all your states.
- **_Optional_**: `@prop {Object} persist` - if you want to persist the store.
- `@prop {Object} persist.storage` - The storage to use to persist the states. E.g. `window.localStorage`.
- `@prop {Function} persist.statesToPersist` - a function that will be invoked when rehydrating the store. The function will receive the `savedState` as it's only parameter. This is either an empty object, when the storage is empty, or the last store that was saved in the storage. The `Provider` will automatically update the `persisted states` every time you call the `updateStore` method on your action handlers. It should return an object of the states that you want to rehydrate.

```jsx
import { render, Component } from 'inferno';
import Provider from 'inferno-context-api-store';

import routes from './routes';
import store from './store';

class App extends Component {
  render () {
    return (
      <Provider
        store={store}
        persist={{
          storage: window.localStorage,
          statesToPersist = (states) => ({
            // I want to persist the authUser so I need to rehydrate it.
            authUser: { ...states.authUser }
          })
        }} >
        <TheRestOfTheApp />
      </Provider>
    );
  }
}

render(
  <App />,
  document.querySelector('#app')
);
```

##### Connecting a component to the store and adding actions to update the store's state.

`connect` is an HOC that passes the state and actions to the wrapped component's props.

- `@param {Function} mapStateToProps` - a function that will be invoked and will receive the store's updated states. It should return an object which will be spread out as props to the component.
- `@param {Object} actions` - an object that contains methods which will be spread out as props to the component. When you call these actions, they will receive an object as the first parameter. This object has a method called `updateStore` which is what you will invoke in the action body when you want to update the store's state. When you invoke the `updateStore`, you should give it an object as it's only parameter, this object is the state that you want to update. It also has a property called `state` which is the store's updated state as of that moment.

```jsx
import { Component } from 'inferno';
import PropTypes from 'prop-types';
import { connect } from 'inferno-context-api-store';

/**
 * in this example, all the action handlers are in the
 * ../store/index.js but it doesn't matter where you store them.
 * there's nothing special about them, they are just actions that you
 * invoke when you want/need to.
 */
import { logout } from '../store';

class Home extends Component {
  componentDidMount () {
    // ..some other codes
    this.props.login(userData, userToken, serverMessage);
  }

  render () {
    // This will contain the authUser, logout function, and login function.
    console.log(this.props);

    return (
      <div>
        <p>Hello world!</p>
      </div>
    );
  }
}

Todos.propTypes = {
  authUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(store => ({
  authUser: store.authUser
}), {
  logout,
  /*
   * You could even add your functions in here if you like.
   * It will receive an object as a first parameter, and the parameters
   * you gave it when you invoked it will be given as the second parameter, third parameter, and on
   * depending on how many parameter you gave it.
   */
  login (store, userData, userToken, serverMessage) {
    /**
     * if your action handler does not call store.updateState()
     * the state will not be updated
     */
    store.updateStore({
      userAuth: { ...userData },
      userToken,
      serverMessage
    });
  }
})(Todos);
```

`mapStateToProps` and `actions` are both optional, that means if you simply want to pass in `actions` but not `states` to your component you can use `connect` like this:

```js
export default connect(null, {
  myAction (store) {
    // do something amazing
  }
})(MyComponent);
```