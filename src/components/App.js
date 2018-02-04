import {Component} from 'inferno';
import {matchPath, Router} from 'inferno-router';
import onEnter from '../../core/helpers/onEnter';
import routes from '../routes';

export default class App extends Component {
  componentDidMount() {
    const { history } = this.props

    // Fetch data on route change
    // TODO: FIX THIS LINE
    // history.listen(location => onEnter(match(routes, location)))
  }

  render({ history }) {
    return (
      <Router history={history}>
        {routes}
      </Router>
    );
  }
}
