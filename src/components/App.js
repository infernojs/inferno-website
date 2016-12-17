import Inferno from 'inferno'
import Component from 'inferno-component'
import { Router, match } from 'inferno-router'
import onEnter from '../../core/helpers/onEnter'
import routes from '../routes'

export default class App extends Component {
    componentDidMount() {
        const { history } = this.props

        // Fetch data on route change
        history.listen(location => onEnter(match(routes, location)))
    }

    render({ history }) {
        return <Router history={history}>
            {routes}
        </Router>
    }
}
