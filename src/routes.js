import {Route, Switch} from 'inferno-router';
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
  <Layout>
    <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/demo" component={DemoInferno} exact/>
      <Route path="/demo/react" component={ReactDemo} exact/>
      <Route path="/benchmarks" component={Benchmarks} exact/>
      <Route path="/docs/:path*" component={Docs}/>
      <Route path="/docs" component={Docs} exact/>
      <Route path="/about" component={About} exact/>
      <Route path="/repl" component={REPL} exact/>
      <Route path="/contribute" component={Contribute} exact/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Layout>
);
