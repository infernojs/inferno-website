import Inferno from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import { Link } from 'inferno-router'

export default class Docs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markdown: null
        }
    }

    componentDidMount() {
        fetch('/api/markdown?file=guides/installation.md')
        .then(response => response.json())
        .then(response => {
            this.setState({ markdown: response })
            this.forceUpdate()
        })
    }

    render() {
        console.log(<aside id="markdown-root"><p>test</p></aside>)
        console.log(this.state.markdown)
        return <aside id="markdown-root">
            {toArray(this.state.markdown).map(m => m)}
        </aside>
    }
}

function toArray(arr) {
    return Array.isArray(arr) ? arr : [arr]
}

/*
    render() {
        return <div className="container padding markdown">
            <aside>
                <Link to="/docs/guides/overview.md">Overview</Link>
                <Link to="/docs/guides/installation.md">Installation</Link>
            </aside>
            <aside id="markdown-root"/>
        </div>
    }
* */
