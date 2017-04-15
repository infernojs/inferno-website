# Inferno Router API

EL API de Router es muy básico y fácil de usar. El siguiente ejemplo es con los componentes clave de ruteo:

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

El componente `Router` crea un nueva estructura de ruteo para la aplicación. El componente acepta una propiedad history que el router envia cuando la ruta cambia. El ejemplo abajo usa la libreria `history` y el metodo `createBrowserHistory`. RouterContext es usado para ruteo del lado del servidor.

## `Route`

El componente `Route` crea una sola definición en el router. Esta acepta `path` y `component` como propiedades permitiendo enlazar la locación URL a un componente especifico en la aplicación. Las Rutas pueden ser anidadas una con la otra describiendo una herarquía de páginas.

## `IndexRoute`

Especifica la ruta raíz o la `/` ruta de acceso de la aplicación.

## `Link`

El componente `Link` puede ser usado para activar cambios. Provee la propiedad `to` como una ruta a la ubicación que deseas.

## `IndexLink`

A conveniencia el componente automaticamente define la ruta del componente a `/`.

## Redirect

Hace un redirecionamiento 302 en el lado del servidor y un `history.replace` en el browser.

```js
<Redirect from="/oldpath" to="/newpath"/>
```

## `match`

Match es una función de conveniencia que devuelve todas las rutas que coincidan con una URL que se suministra. El primer argumento es una lista de las rutas y la segunda es la URL actual.

```js
const renderProps = match(routes, req.originalUrl);
if (renderProps.redirect) {
    // handle redirect
}
```

## `matchPath`

Convierte la ruta a una expresión regular, si se encuentra una coincidencia entonces extraemos los parametros de ella.

```js
const matchBase = matchPath(isLast, location, pathToMatch);
```

## onEnter / onLeave hooks

En algunos casos, talves necesites ejecutar alguna logica antes del ruteo.
Lo puedes hacer facilmente pasando una `función` en el componente `Route` via una prop, como se muestra abajo:

```js
Inferno.render((
  <Router>
    <IndexRoute component={ Home }
                onEnter={ authorizedOnly }
                onLeave={ sayGoodBye } />
  </Router>
), container);
```
