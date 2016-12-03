import Inferno from 'inferno'
import { IndexLink, Link } from 'inferno-router'

export default function({ children }) {
    return <div>
        <menu className="container">
            <nav className="align-left">
                <IndexLink>Home</IndexLink>
            </nav>
            <nav className="align-right">
                <Link to="/about">About <DownArrow/></Link>
                <Link to="/docs">Docs <DownArrow/></Link>
                <Link to="/contribute">Contribute</Link>
                <Link to="/help">Help</Link>
            </nav>
        </menu>
        <main>
            {children}
        </main>
        <footer>footer</footer>
    </div>
}

const DownArrow = () => (
    <span className="down-arrow">&#x25BC;</span>
)
