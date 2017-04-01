import Inferno from 'inferno'
import { IndexRoute, Route } from 'inferno-router'
import Layout from './components/layout/Layout'
import NotFound from './components/layout/404'
import Home from './pages/Home'
//import DemoInferno from './components/demo/Demo.Inferno'
//import DemoReact from './components/Demo/Demo.React'
import Docs from './pages/Docs'
import About from './pages/About'
import Contribute from './pages/Contribute'

function ReactDemo() {
    return <div>
        <script src="http://localhost:8082/build/react.js" async="async"/>
        <iframe src=""/>
    </div>
}

function Wrap(props) {
    return props.children;
}

/**
 * Routes are defined here.
 */
//<Route path="/demo" component={ DemoInferno }/>
export default (
    <Route component={ Layout }>
        <IndexRoute component={ Home }/>
        <Route path="/demo/react" component={ ReactDemo }/>
        <Route path="/docs" component={ Wrap }>
            <Route path="*" component={Docs} />
        </Route>
        <Route path="/about" component={ About }/>
        <Route path="/contribute" component={ Contribute }/>
        <Route path="*" component={ NotFound }/>
    </Route>
)
