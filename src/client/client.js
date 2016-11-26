// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import 'isomorphic-fetch'
import '../../core/polyfills'
import '../../core/logger'
import '../assets/css/index.scss'
import onEnter from '../../core/helpers/onEnter'
import Inferno from 'inferno'
import { Router, match } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './routes'

// We render our react app into this element
const root = document.getElementById('root')
const history = createBrowserHistory()

/**
 * Render our component according to our routes
 */
Inferno.render(<Router history={history}>
    {routes}
</Router>, root)

// Fetch data on route change
history.listen(location => onEnter(match(routes, location)))

if (module.hot) {
    module.hot.accept()
}
