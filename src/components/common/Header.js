import Inferno from 'inferno'
import Component from 'inferno-component'
import { Link } from 'inferno-router'

export default class Header extends Component {
        constructor(props) {
        super(props)
        this.state = {active: false}
    }

    click() {
        this.setState({active: !this.state.active});
    }

    render() {
        return  <nav className={this.state.active ? "show" :""}>
                <Link to="/about">About</Link>
                <Link to="/docs">Docs</Link>
                <Link to="/contribute">Contribute</Link>
                <Link to="/help">Help</Link>
                <div className="menu-bar" onClick={this.click.bind(this)}>
        <svg width="44px" height="44px" viewBox="0 0 44 44" preserveAspectRatio="none">
            <path d="m 31.002119,15.984 c 0,0.82 -0.665,1.484 -1.484,1.484 l -15.032,0 c -0.819,0.001 -1.484,-0.664 -1.484,-1.484 l 0,0 c 0,-0.819 0.665,-1.484 1.484,-1.484 l 15.031,0 c 0.82,0 1.485,0.665 1.485,1.484 l 0,0 z" />
            <path d="m 30.997882,21.944916 c 0,0.819 -0.665,1.484 -1.484,1.484 l -15.032001,0 c -0.819,0 -1.484,-0.665 -1.484,-1.484 l 0,0 c 0,-0.82 0.665,-1.484 1.484,-1.484 l 15.031001,0 c 0.82,-0.001 1.485,0.664 1.485,1.484 l 0,0 z" />
            <path d="m 31.002119,28.016 c 0,0.819 -0.665,1.484 -1.484,1.484 l -15.032,0 c -0.819,0 -1.484,-0.665 -1.484,-1.484 l 0,0 c 0,-0.82 0.665,-1.484 1.484,-1.484 l 15.031,0 c 0.82,-0.001 1.485,0.664 1.485,1.484 l 0,0 z" />
        </svg>
                </div>
        </nav>
    }
}
