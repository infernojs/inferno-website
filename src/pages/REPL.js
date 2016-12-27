import Inferno from 'inferno'
import Component from 'inferno-component'
import Editor from '../components/repl/Editor'

const codeSample = `
// Our default export
export default () => {
    return <MyInfernoTest onComponentDidMount={onComponentDidMount}/>;
}

let time = (new Date()).toLocaleString()

function onComponentDidMount(domNode) {
    setInterval(function() {
        domNode.querySelector('span').innerHTML = (new Date()).toLocaleString()
    }, 1000)
}

const MyInfernoTest = () => {
    return <h2>Current time: <span>{time.toString()}</span></h2>;
}
`

export default class REPL extends Component {
    render() {
        return <div className="repl p-2">
            <h1>REPL</h1>
            <Editor>{codeSample}</Editor>
        </div>
    }
}
