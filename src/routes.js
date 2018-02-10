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

const AppRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout {...props}>
      <Component {...props} />
    </Layout>
  )} />
)

/**
 * Routes are defined here.
 */
//<Route path="/demo" component={ DemoInferno }/>
export default (
    <Switch>
      <AppRoute path="/" component={Home} exact/>
      <AppRoute path="/demo" component={DemoInferno} exact/>
      <AppRoute path="/demo/react" component={ReactDemo} exact/>
      <AppRoute path="/benchmarks" component={Benchmarks} exact/>
      <AppRoute path="/docs/:path*" component={Docs}/>
      <AppRoute path="/docs" component={Docs} exact/>
      <AppRoute path="/about" component={About} exact/>
      <AppRoute path="/repl" component={REPL} exact/>
      <AppRoute path="/contribute" component={Contribute} exact/>
      <AppRoute path="*" component={NotFound}/>
    </Switch>
);
