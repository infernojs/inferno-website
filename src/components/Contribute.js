import {Component} from 'inferno';
import {Link} from 'inferno-router';

export default class Contribute extends Component {

  componentDidMount() {
  }

  render() {
    return <div className="text-xs-center p-3">
      <h1>Contribute</h1>

      <Link to="/">Go to Homepage</Link>
    </div>;
  }
}
