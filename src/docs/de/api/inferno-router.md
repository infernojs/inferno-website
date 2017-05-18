# Inferno Router API

Die Router API ist grundsätzlich einfach zu nutzen. Es folgt ein Beispiel wie die Routing-Komponente eingesetzt wird:


```jsx
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

Die `Router` Komponente erzeugt eine neue Routing-Struktur für eine Anwendung. Die Komponente akzeptiert ein `history` Attribut, welches der Router nutzt um Änderungen hinzu zufügen. Das Beispiel oben initialisiert das `history` Attribut mit der Methode `createBrowserHistory`. Der RouterContext wird für Pfad-Routing auf dem Server genutzt.

## `Route`

Die `Route` Komponente erzeugt eine einzelne Routen-Definition im Router. Sie akzeptiert die Attribute `path` und `component` als Props, welche es einer Anwendung erlauben URLs an spezifische Komponenten zu binden. Routen können ineinander geschachtelt werden. Siehe Seiten-Hierachie.

## `IndexRoute`

Spezifiziert die Basis-Route oder den `/` Pfad einer Anwendung.

## `Link`

Die `Link` Komponente kann eingesetzt werden, um dem Router Änderungen mitzuteilen. Das Attribute `to` nimmt einen Pfad entgegen, welcher dem Router einen Ort in der Anwendung zeigt.

## `IndexLink`

Die `IndexLink` Komponente setzt automatische die `to` Prop auf `/`.

## Redirect

Führt eine Weiterleitung, HTTP-Code 302, auf dem Server aus und ein `history.replace` im Browser.

```jsx
<Redirect from="/oldpath" to="/newpath"/>
```

## `match`

`match` ist eine Funktion, die alle Routen zurück gibt, die eine URL anbieten. Das erste Argument ist eine Liste von verfügbaren Routen und das zweite Argument ist die aktuelle Route.

```jsx
const renderProps = match(routes, req.originalUrl);
if (renderProps.redirect) {
    // handle redirect
}
```

## `matchPath`

Konvertiert Pfad zu einem Regex. Wenn ein Treffer gefunden wird, werden die Parameter extrahiert.

```js
const matchBase = matchPath(isLast, location, pathToMatch);
```

## onEnter / onLeave Hooks

In manchen Fällen muss Logik vor oder nach dem Routing ausgeführt werden. Dies wird erreicht, wenn eine `function` der `Route` Komponente via Prop übergeben wird. Siehe unten:


```jsx
Inferno.render((
  <Router>
    <IndexRoute component={ Home }
                onEnter={ authorizedOnly }
                onLeave={ sayGoodBye } />
  </Router>
), container);
```
