import Inferno from 'inferno'
import Component from 'inferno-component'
import Editor from '../components/repl/Editor'

export default class REPL extends Component {
    render() {
        return <div className="repl">
            <h1>REPL</h1>
            <Editor/>
        </div>
    }
}
