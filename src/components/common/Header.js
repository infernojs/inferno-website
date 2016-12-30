import { Link, Router } from 'inferno-router'

import Component from 'inferno-component'
import IconMenu from '../icons/IconMenu'
import Inferno from 'inferno'
import InfernoLogo from '../icons/IconInferno'

export default class Header extends Component {

    constructor(props) {
        super(props)
        this.state = { active: false }
    }

    componentDidMount() {
        const main = document.querySelector('main')
        main.addEventListener('click', this.closeSidebar)
    }

    componentWillUnmount() {
        const main = document.querySelector('main')
        main.removeEventListener('click', this.closeSidebar)
    }

    closeSidebar = (e) => {
        this.setState({ active: false });
    }

    toggleSidebar = (e) => {
        this.setState({ active: !this.state.active });
    }

    render() {
        const MenuLink = (props) => (
            <Link activeClassName="selected" {...props} onClick={ this.closeSidebar }>
                {props.children}
            </Link>
        )

        return (
        <div className="menu">
            <div className="container">
            <div className="row">
                <div className="menu-toggle" onClick={ this.toggleSidebar }>
                    <IconMenu/>
                </div>
                <MenuLink to="/" className="branding lg3 sm3"><InfernoLogo/> Inferno</MenuLink>
                <nav className={ 'lg9 sm9 ' + (this.state.active ? 'open' : 'closed') }>
                    <MenuLink to="/">Home</MenuLink>
                    <MenuLink to="/about">About</MenuLink>
                    <MenuLink to="/docs/guides/installation">Docs</MenuLink>
                    <a target="_blank" rel="noopener" href="https://github.com/trueadm/inferno/issues" onClick={ this.closeSidebar }>Contribute</a>
                    <a target="_blank" rel="noopener" href="https://github.com/infernojs" onClick={ this.closeSidebar }>Github</a>
                </nav>
            </div></div>
        </div>
        )
    }
}
