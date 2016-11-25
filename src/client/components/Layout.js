import Inferno from 'inferno'
import Component from 'inferno-component'
import { Link } from 'inferno-router'

export default class Layout extends Component {
    render({ children }) {
        return <div>
            <menu>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </menu>
            <main>
                {children}
            </main>
        </div>
    }
}
