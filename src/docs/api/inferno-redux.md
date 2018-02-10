# Inferno Redux API

We understand that a lot of applications in the React ecosystem use [Redux](//redux.js.org) to manage data. Thus we have created a port of React-Redux for Inferno to ease the process of porting an application over.

## `Provider`

The `Provider` component allows an application to connect to a Redux store.

**Warning:** The `store` prop on a `Provider` should not be changed dynamically and doing so is not supported in `Inferno-redux`.

```jsx
import { render } from 'inferno';
import { Provider } from 'inferno-redux';
import { createStore } from 'redux';

// Component Declarations...

const store = createStore(..reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## Connect

```javascript
connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options: {
    pure,
    areStatesEqual,
    areOwnPropsEqual,
    areStatePropsEqual,
    areMergedPropsEqual,
    getDisplayName,
    methodName,
    renderCountProp,
    shouldHandleStateChanges,
    storeKey,
    withRef
  }
)
```

The `connect` function allows components to access the Redux store state.
