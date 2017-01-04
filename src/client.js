// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import 'isomorphic-fetch'
import '../core/polyfills'
import '../core/logger'
import './assets/css/index.scss'
import Inferno from 'inferno'
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/App'

if (module.hot) {
    require('inferno-devtools');
}

// We render our react app into this element
const root = document.getElementById('root')
const history = createBrowserHistory();

history.listen((location, action) => {
  window.ga('send', 'pageview', location.pathname);
});

/**
 * Render our component according to our routes
 */
Inferno.render(<App history={history}/>, root)

// cache all assets if browser supports serviceworker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const sw = navigator.serviceWorker

	sw.register('/offline.js').then(function () {
        console.debug('ServiceWorker: registered')
    }).catch(function(err) {
        console.error('ServiceWorker:', err)
    })

    /*sw.register('/sw.js').then(function() {
        console.debug('CDN Worker: registered')
    }).catch(function(err) {
        console.error('ServiceWorker:', err)
    })*/

    sw.ready.then(function(registration) {
        console.debug('Worker: ready')
    })
}

if (module.hot) {
    module.hot.accept()
}
