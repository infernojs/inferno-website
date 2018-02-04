import { Route } from 'inferno-router';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Benchmarks from './components/Benchmarks';
import DemoInferno from './components/demo/Demo.Inferno';
import Docs from './components/Docs';
import About from './components/About';
import REPL from './components/REPL';
import Contribute from './components/Contribute';

function ReactDemo() {
  return <div>
    <script src="http://localhost:8082/build/react.js" async="async"/>
    <iframe src=""/>
  </div>;
}

/**
 * Routes are defined here.
 */
//<Route path="/demo" component={ DemoInferno }/>
export default (
  <Route component={Layout}>
    <Route component={Home}/>
    <Route path="/demo" component={DemoInferno}/>
    <Route path="/demo/react" component={ReactDemo}/>
    <Route path="/benchmarks" component={Benchmarks}/>
    <Route path="/docs/:path*" component={Docs}/>
    <Route path="/docs" component={Docs}/>
    <Route path="/about" component={About}/>
    <Route path="/repl" component={REPL}/>
    <Route path="/contribute" component={Contribute}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
