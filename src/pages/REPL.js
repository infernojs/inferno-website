import Inferno from 'inferno'
import Component from 'inferno-component'
import Editor from '../components/repl/Editor'

const codeSample = `
export default function MainComponent() {
    return <MyInfernoTest/>;
}

const MyInfernoTest = () => {
    return <h2>It works!</h2>;
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
