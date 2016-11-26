import Inferno from 'inferno'
import Component from 'inferno-component'
import { Link } from 'inferno-router'

export default class Layout extends Component {
    render({ children }) {
        return <div>
            <menu>
                <div className="align-left">
                    <Link to="/">Home</Link>
                </div>
                <div className="align-right">
                    <Link to="/about">About</Link>
                    <Link to="/about">Docs</Link>
                    <Link to="/about">Contribute</Link>
                    <Link to="/about">Help</Link>
                </div>
            </menu>
            <main>
                {children}
            </main>
        </div>
    }
}
