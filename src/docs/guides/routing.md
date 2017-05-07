# Routing

Inferno Router is a routing library for **Inferno**

Usage of `inferno-router` is similar to that of [react-router](https://github.com/ReactTraining/react-router/blob/master/docs/API).  

## Install

```
npm install inferno-router
```

## Features

* Router / RouterContext
* Route / IndexRoute
* Link / IndexLink
* Redirect / IndexRedirect
* browserHistory / memoryHistory
* onEnter / onLeave hooks
* params / querystring parsing

## Usage (client-side)

```js
import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

function App({ children }) {
  // ...
}

function NoMatch({ children }) {
  // ...
}

function Home({ children }) {
  // ...
}

// `children` in this case will be the `User` component
function Users({ children, params }) {
  return <div>{ children }</div>
}

function User({ params }) {
  return <div>{ JSON.stringify(params) }</div>
}

const routes = (
  <Router history={ browserHistory }>
    <Route component={ App }>
      <IndexRoute component={ Home }/>
      <Route path="users" component={ Users }>
        <Route path="/user/:username" component={ User }/>
      </Route>
      <Route path="*" component={ NoMatch }/>
    </Route>
  </Router>
);

// Render HTML on the browser
Inferno.render(routes, document.getElementById('root'));
```

## Server-side rendering (express)

```js
import Inferno from 'inferno';
import { renderToString } from 'inferno-server'
import { RouterContext, match } from 'inferno-router';
import express from 'express';
import routes from './routes';

function Html({ children }) {
  return (
    <html>
      <head>
        <title>My Application</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
  </html>
  );
}

const app = express();

app.use((req, res) => {
  const renderProps = match(routes, req.originalUrl);
  if (renderProps.redirect) {
    return res.redirect(renderProps.redirect)
  }
  
  const content = (<Html><RouterContext {...renderProps}/></Html>);

  res.send('<!DOCTYPE html>\n' + renderToString(content));
});
```

## Server-side rendering (koa v2)

```js
import Inferno from 'inferno';
import { renderToString } from 'inferno-server'
import { RouterContext, match } from 'inferno-router';
import Koa from 'koa';
import routes from './routes';

function Html({ children }) {
  return (
    <html>
      <head>
        <title>My Application</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
  </html>
  );
}

const app = new Koa()

app.use(async(ctx, next) => { 
  const renderProps = match(routes, ctx.url);
  if (renderProps.redirect) {
    return ctx.redirect(renderProps.redirect)
  }
  
  const content = (<Html><RouterContext {...renderProps}/></Html>);
  
  ctx.body = '<!DOCTYPE html>\n' + renderToString(content);
  await next();
});
```

## onEnter / onLeave hooks

In some cases, you may need to execute some logic before or after routing.
You can easily do this by passing a `function` to the `Route` component via a prop, as shown below:

```js
import Inferno from 'inferno';
import { Router, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

function Home({ params }) {
  // ...
}

function authorizedOnly(props, router) {
  if (!props.loggedIn) {
    router.push('/login');
  }
}

function sayGoodBye(props, router) {
  alert('Good bye!')
}

Inferno.render((
  <Router history={ createBrowserHistory() }>
    <IndexRoute component={ Home } 
                onEnter={ authorizedOnly } 
                onLeave={ sayGoodBye } />
  </Router>
), container);
```

## Redirect

```js
<Router history={ createBrowserHistory() }>
  <Redirect from="/oldpath" to="/newpath"/>
  <Route path="/newpath" component={ MyComponent }/>
</Router>
```

## Code Splitting with Webpack

When bundling your project with Webpack, by default a large bundle of JavaScript is created that contains all the code for your entire site or application. This can be an unnecessary amount of data for the browser to fetch and parse when some of that code is only used for certain Routes. 

Webpack can automatically create bundles for each route if you use the `getComponent` property of a Route instead of the `component` property, and call `require()` for those components manually. The example below will create separate bundles for the root, "about", and wildcard routes.

```js
import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

Inferno.render((
  <Router history={ browserHistory }>
    <Route component={ App }>
    <IndexRoute
      getComponent={(props, cb) => {
        require.ensure([], require => cb(null, require('/your/webpack/path/to/the/Home/component').default), 'custom-chunk-filename');
      }}
    />
    <Route 
      path="/about"
      getComponent={(props, cb) => {
        require.ensure([], require => cb(null, require('/your/webpack/path/to/the/About/component').default));
      }}
     />
    <Route 
      path="*"
      getComponent={(props, cb) => {
        require.ensure([], require => cb(null, require('/your/webpack/path/to/the/NoMatch/component').default));
      }}
    />
    </Route>
  </Router>
), document.getElementById('root'));
```

Your Webpack configuration's "output" rules also need to be updated so that the bundles all output to a different file, otherwise they'll all attempt to create a "bundle.js" file by default. For example:

```js
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js', // pass name of module as third argument to require.ensure for naming the chunk 
    ...
  },
```
For more information on Webpack code splitting, [visit its documentation.](https://webpack.js.org/guides/code-splitting/)

## Notes

* `<IndexRoute>` is the same as `<Route path="/">"`
* `<IndexLink>` is the same as `<Link to="/">`
