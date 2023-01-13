# Inferno Router

Inferno Router is a routing library for [Inferno](https://github.com/infernojs/inferno). It is a port of [react-router 4](https://v5.reactrouter.com/web/guides/quick-start) which was refactored into react-router v5.

## Install

```
npm install inferno-router
```

## Features

Same as react-router v4 (later updated to v5), except react-native support.

Added features from react-router v5:
- NavLink supports passing function to className-attibute
- NavLink supports passing function to style-attibute

Features added from react-router@6:
- Async data fetching before navigation using [`loader`-attribute](https://reactrouter.com/en/main/route/loader). See [demo](https://github.com/infernojs/inferno/tree/master/demo/inferno-router-demo).

NOTE: While we want the basic fetch behaviour to be the same as react-router@6, we are currently missing:
- download progress support
- form submission
- redirect support
- not exposing headers, type or status code to render method

See official react-router [documentation](https://v5.reactrouter.com/web/guides/philosophy)

## Usage (client-side)

```js
import { render } from 'inferno';
import { BrowserRouter, Route, Switch, Link, useLoaderData, useLoaderError } from 'inferno-router';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = (props) => {
  const data = useLoaderData(props);
  const err = useLoaderError(props);

  return (
    <div>
      <h2>About</h2>
      <p>{data?.body || err?.message}</p>
    </div>
  )
};

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const MyWebsite = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} loader={() => fetch(new URL('/api/about', BACKEND_HOST))} />
        <Route path="/topics" component={Topics} />
      </Switch>
    </div>
  </BrowserRouter>
);

// Render HTML on the browser
render(<MyWebsite />, document.getElementById("app"));

```


## Usage (server) with express

First, let's create our component to render boilerplate HTML, header, body etc.

```js
// Routes will be rendered into children
export default function Html({ children }) {
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
```

```js
import { renderToString } from 'inferno-server';
import { StaticRouter } from 'inferno-router';
import express from 'express';
import Html from './Html';

const app = express();

app.use((req, res, next) => {
  let context = {};
  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Html/>
    </StaticRouter>
  );
  if(context.url){
    return res.redirect(context.url);
  }
  res.send('<!DOCTYPE html>\n' + renderToString(content));
  next();
});
```

## Usage (server) with koa v2

```js
import { renderToString } from 'inferno-server';
import { StaticRouter } from 'inferno-router';
import Koa from 'koa';
import Html from './Html';

const app = new Koa();

app.use(async(ctx, next) => {

  const context = {};
  const content = renderToString(
    <StaticRouter location={ctx.url} context={context}>
      <Html/>
    </StaticRouter>
  );

  // This will contain the URL to redirect to if <Redirect> was used
  if (context.url) {
    return ctx.redirect(context.url)
  }

  ctx.body = '<!DOCTYPE html>\n' + content;
  await next();
});
```


## Differences with React-Router v4

* No "official" react-native support.
* There's no `inferno-router-dom`, all functionality is inside `inferno-router`
