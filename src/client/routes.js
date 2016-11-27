import Inferno from 'inferno'
import { Route } from 'inferno-router'
import Layout from './components/Layout'
import NotFound from './containers/NotFound'
import Home from './components/Home'
import DemoInferno from './components/Demo/Demo.Inferno'
//import DemoReact from './components/Demo/Demo.React'
import About from './components/About'

function ReactDemo() {
    return <div>
        <script src="http://localhost:8082/build/react.js" async="async"/>
        <iframe src=""/>
    </div>
}

/**
 * Routes are defined here.
 */
export default (
    <Route component={ Layout }>
        <Route path="/" component={ Home }/>
        <Route path="/demo" component={ DemoInferno }/>
        <Route path="/demo/react" component={ ReactDemo }/>
        <Route path="/about" component={ About }/>
        <Route path="*" component={ NotFound }/>
    </Route>
)
