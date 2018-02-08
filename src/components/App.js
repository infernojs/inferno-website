import {Component} from 'inferno';
import {BrowserRouter} from 'inferno-router';
import routes from '../routes';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  }
}
