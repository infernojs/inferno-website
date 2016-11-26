import Inferno from 'inferno'
import { Route } from 'inferno-router'
import Layout from './components/Layout'
import NotFound from './containers/NotFound'
import Home from './components/Home'
import About from './components/About'

/**
 * Routes are defined here.
 */
export default (
    <Route component={ Layout }>
        <Route path="/" component={ Home }/>
        <Route path="/about" component={ About }/>
        <Route path="*" component={ NotFound }/>
    </Route>
)
