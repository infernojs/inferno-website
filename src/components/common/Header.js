import Inferno from 'inferno'
import Component from 'inferno-component'
import { Link } from 'inferno-router'
import IconMenu from '../icons/IconMenu'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {active: false}
    }
    click() {
        this.setState({ active: ! this.state.active });
    }
    render() {
        return (
        <div>
            <div className="menu-bar" onClick={ this.click.bind(this) }>
            <IconMenu/>
            </div>
            <nav className={ this.state.active ? "show" :"" }>
                <Link onClick={ this.click.bind(this) } to="/about">About</Link>
                <Link to="/docs">Docs</Link>
                <Link to="/contribute">Contribute</Link>
                <Link to="https://github.com/trueadm/inferno/issues">Help</Link>
                <Link to="/repl">REPL</Link>
            </nav>
        </div>
        )
    }
}
