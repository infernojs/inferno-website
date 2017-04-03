# Inferno Router API

The Router API is very basic and easy to use. The following is an example with the key routing components:

```js
import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

const routes = (
  <Router history={ browserHistory }>
    <Route component={ App }>
      <IndexRoute component={ Homepage }/>
      <Route path="/about" component={ About }>
        <Route path="/about/teammembers/:person" component={ TeamMember }/>
      </Route>
    </Route>
  </Router>
);
```

## `Router`

The `Router` component creates a new routing structure for an application. The component accepts a history property which the router will push to when the route changes. The example above uses the `history` libraries `createBrowserHistory` method. RouterContext is used for server-side path routing.

## `Route`

The `Route` component creates a single route definition on the router. It accepts `path` and `component` as properties allowing you to bind URL locations to specific components in an app. Routes can be nested within each other to describe page hierarchy.

## `IndexRoute`

Specifies the root route or the `/` path within the application.

## `Link`

The `Link` component can be used to trigger changes in the router. Supply a `to` property as a path to the location you desire.

## `IndexLink`

A convenience component that automatically sets the component path to `/`.

## Redirect

Does a 302 redirect on the server side and a `history.replace` on the browser.

```js
<Redirect from="/oldpath" to="/newpath"/>
```

## `match`

Match is a convenience function that returns all routes that match a supplied URL. The first argument is a list of available routes and the second is the current URL.

```js
const renderProps = match(routes, req.originalUrl);
if (renderProps.redirect) {
    // handle redirect
}
```

## `matchPath`

Converts path to a regex, if a match is found then we extract params from it.

```js
const matchBase = matchPath(isLast, location, pathToMatch);
```

## onEnter / onLeave hooks

In some cases, you may need to execute some logic before or after routing.
You can easily do this by passing a `function` to the `Route` component via a prop, as shown below:

```js
Inferno.render((
  <Router>
    <IndexRoute component={ Home }
                onEnter={ authorizedOnly }
                onLeave={ sayGoodBye } />
  </Router>
), container);
```
