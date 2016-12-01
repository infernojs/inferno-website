import Inferno from 'inferno'
import { Link } from 'inferno-router'

export default function({ children }) {
    return <div>
        <div className="container">
        <nav>
            <Link to="/about">About <DownArrow/></Link>
            <Link to="/docs">Docs <DownArrow/></Link>
            <Link to="/contribute">Contribute</Link>
            <Link to="/help">Help</Link>
        </nav>
            </div>
        <main>
            {children}
        </main>
    </div>
}

const DownArrow = () => (
    <span className="down-arrow">&#x25BC;</span>
)
