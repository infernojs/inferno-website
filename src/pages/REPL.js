import Inferno from 'inferno'
import Component from 'inferno-component'
import Editor from '../components/repl/Editor'

export default class REPL extends Component {
    render() {
        return <div className="repl p-2">
            <h1>REPL</h1>
            <Editor/>
        </div>
    }
}
