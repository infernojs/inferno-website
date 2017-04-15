# Inferno Server API

## `renderToString`

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

InfernoServer.renderToString(<div />);
```
Renderizar el string HTML, suministrando en el virtual DOM. Esto debe ser utilizado unicamente en el servidor, para generar string HTML enviar la petición para cargas rapidas de página y mejorar el performance SEO.

Si `Inferno.render()` es llamado en un envio string usando el metodo entonces Inferno va a añadir ganchos o 'hooks' en el DOM incrementando el performance en el render inicial.

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

const App = function({ color = 'red', name }) {
  return (
    <div style={{ color }}>
      Hello
      <span>{name}</span>
    </div>
  )
}

InfernoServer.renderToString(<App color="blue" name="world">)
// "<div style="color: blue;">Hello<span>World</span></div>"
```

## `renderToStaticMarkup`

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

InfernoServer.renderToStaticMarkup(<div />);
```

Al igual que `InfernoServer.renderToString ()` `renderToStaticMarkup` devolverá la un HTML string suministrado por el virtual DOM, sin embargo, esto no adjuntará ninguno de los atributos DOM de Inferno que son utilizados internamente por Inferno. Esto es útil para mejorar el rendimiento, ya que puede rescatar un número de bytes en la solicitud de página.

## Render Stream API

Inferno 1.2.1 introdujo un renderizador secuencial experimental que soporta componentes asíncronos con estado. No debe utilizarse en la producción todavía, aun hay trabajo que se está haciendo para aumentar el rendimiento y características. Tenga en cuenta que la renderización de secuencial es actualmente aproximadamente un 10-15% más lenta que `renderToString`.

## `streamQueueAsString`

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

const App = function({ color = 'red', name }) {
  return (
    <div style={{ color }}>
      Hello
      <span>{name}</span>
    </div>
  )
}
InfernoServer.streamQueueAsString(App).pipe(res);
```
El siguiente es un ejemplo de un componente con estado que proporciona una Promesa. El renderer pondrá en cola la promesa y al ser resuelta, transmitira la salida al cliente. Utilice `getInitialProps ()` para denotar una acción asíncrona, que recibe los props y el contexto como parámetros. El objeto devuelto en la promesa se mezcla en los props del componente.

Tener acceso a los props y el contexto de esta manera le da la capacidad de pasar en cualquier dependencia necesaria es decir. Un conector de base de datos, accesos entrantes de un padre, etc.

```jsx
class MyAsyncComponent extends Component<any, any> {
  getInitialProps(props, context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          value: 'I waited long enough!'
        });
      }, 150);
    });
  }
  render() {
    return createElement(
      'span', null,
      `The returned value is: ${ this.props.value }`
    );
  }
}
InfernoServer.streamQueueAsString(MyAsyncComponent).pipe(res);
```

Elementos producidos por el renderer se transmiten en pedazos, generalmente nodo por nodo, pero como un síntoma de la implementación, pueden transmitir fragmentos más grandes si las promesas tardan más tiempo en resolver.
