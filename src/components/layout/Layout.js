import Inferno from 'inferno'
import { IndexLink, Link } from 'inferno-router'

export default function({ children }) {
    return <div>
        <menu className="container">
            <div className="align-left">
                <IndexLink>Home</IndexLink>
            </div>
            <div className="align-right">
                <Link to="/about">About <DownArrow/></Link>
                <Link to="/docs">Docs <DownArrow/></Link>
                <Link to="/contribute">Contribute</Link>
                <Link to="/help">Help</Link>
            </div>
        </menu>
        <main>
            {children}
        </main>
    </div>
}

const DownArrow = () => (
    <span className="down-arrow">&#x25BC;</span>
)
