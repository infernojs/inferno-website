import Inferno from 'inferno'
import Component from 'inferno-component'
import { Link } from 'inferno-router'

export default class NotFound extends Component {
    render() {
        return <div className="text-xs-center p-3">
            <h1>Page not found. Are you lost ?</h1>

            <Link to="/">Go to Homepage</Link>
        </div>
    }
}
