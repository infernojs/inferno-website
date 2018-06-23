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

Seemless, lightweight, state management library that comes with asynchronous support out of the box. Inspired by Redux and Vuex. Built on top of [inferno-create-context](https://github.com/kurdin/create-inferno-context).

The file size is roughly 5.1kb transpiled, not minified.

Read the docs at https://github.com/aprilmintacpineda/inferno-context-api-store.

### Usage

Usage is the same as with redux. Except I used React's new Context API in version 16.3.0. I also simplified store creation, action definition, and async action handing. If you've used Redux and Vuex in the past, everything here will be familiar to you.

### Install

```
npm install --save
```

### Working example

https://aprilmintacpineda.github.io/inferno-context-api-store/#/

### Example code

**Provider**

```jsx
import { render, Component } from 'inferno';
import { HashRouter, Route, Link, Switch } from 'inferno-router';
import Provider from 'inferno-context-api-store';

import routes from './routes';

import store from './store';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <ul>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <Switch>
              {
                routes.map((route, i) => <Route key={i} {...route} />)
              }
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

render(
  <App />,
  document.querySelector('#app')
);
```

**Connect**

```jsx
import { Component } from 'inferno';
import PropTypes from 'prop-types';
import { connect } from 'inferno-context-api-store';

/**
 * in this example, all the action handlers are in the
 * ../store/index.js but it does matter where you store them,
 * they are just functions that when executed gains access to the
 * store.
 */
import { updateTodoDone, deleteTodo, addTodo } from '../store';

class Todos extends Component {
  state = {
    newTodoValue: ''
  }

  handleNewTodoSubmit = (e) => {
    e.preventDefault();

    return this.props.addTodo(this.state.newTodoValue, () => this.setState({
      newTodoValue: ''
    }));
  }

  addTodoForm = () => {
    return (
      <form onSubmit={this.handleNewTodoSubmit}>
        <input
          type="text"
          value={this.state.newTodoValue}
          onInput={e => this.setState({
            newTodoValue: e.target.value
          })}
        />
        <input type="submit" value="Add todo" />
      </form>
    );
  }

  render () {
    if (!this.props.todos.length) {
      return (
        <div>
          {this.addTodoForm()}
          <h1>Hi {this.props.userState.username}, your todo list is empty.</h1>
        </div>
      );
    }

    return (
      <div>
        {this.addTodoForm()}
        <h1>Hi {this.props.userState.username}, {'here\'s your todo list'}.</h1>
        {
          this.props.todos.map((todo, i) =>
            <div key={i} style={{ marginBottom: '10px' }}>
              <span
                style={{ cursor: 'pointer', userSelect: 'none', backgroundColor: 'red', color: 'white', marginRight: '2px', borderRadius: '2px', padding: '1px' }}
                onClick={() => this.props.deleteTodo(todo.value, i)}>x</span>
              <label style={{ cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={e => this.props.updateTodoDone(e.target.checked, todo.value, i)}
                />
                {
                  todo.isDone?
                    <span style={{ color: 'red', textDecoration: 'line-through' }}>
                      <span style={{ color: 'gray' }}>{todo.value}</span>
                    </span>
                  : <span>{todo.value}</span>
                }
              </label>
            </div>
          )
        }
      </div>
    );
  }
}

Todos.propTypes = {
  userState: PropTypes.object.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTodoDone: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired
};

export default connect(store => ({
  userState: store.userState,
  todos: store.todos
}), {
  updateTodoDone,
  deleteTodo,
  addTodo,
  // you could also add something else here
  anotherAction (store) {
    /**
     * if your action handler does not call store.updateState();
     * nothing will happen to the state
     */
    console.log(store);
  }
})(Todos);
```