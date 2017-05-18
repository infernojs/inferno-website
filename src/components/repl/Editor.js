import Inferno from 'inferno'
import Component from 'inferno-component'
import Scripts from './Scripts'
import Loading from './Loading'

const options = {
    plugins: [
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-block-scoping",
        "transform-es2015-classes",
        "transform-es2015-computed-properties",
        "transform-es2015-literals",
        "transform-es2015-parameters",
        "transform-es2015-shorthand-properties",
        "transform-es2015-spread",
        "transform-es2015-template-literals",
        "transform-class-properties",
        "transform-es2015-modules-commonjs",
        "transform-es2015-destructuring",
        "transform-object-rest-spread",
        "babel-plugin-inferno"
    ]
}

function compile(jsxCode) {
    try {
        const { code } = window.compiler.transform(jsxCode, options)
        const ExportedComponent = eval(code) //.replace(/"use strict";/g, '')
        if (typeof ExportedComponent !== 'function') {
            console.error('You must export at least one component')
        }
        const infernoResult = <ExportedComponent/>
        return infernoResult
    } catch(ex) {
        return <p>Compiler Error: {ex.message}</p>
    }
}

export default class Editor extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        // Execute code when CodeMirror is available
        let intval = setInterval(() => {
            if (window.CodeMirror && window.compiler) {
                this.setState({ loaded: true })
                this.initEditor()
                setTimeout(() => {
                    this.handleCompile()
                }, 100)
                clearInterval(intval)
            }
        }, 50)
    }

    initEditor = () => {
        const textArea = document.getElementById('repl-editor')
        window.editor = new CodeMirror.fromTextArea(textArea, {
            theme: "neo",
            lineNumbers: true,
            styleActiveLine: true
        })
    }

    handleCompile = (e) => {
        if (e) e.preventDefault()

        const vNodes = compile(window.editor.doc.getValue())
        this.setState({ vNodes })
    }

    render({ children, loaded }) {
        if (!loaded) {
            return null;
        }

        return <div className="repl">
            <Scripts loaded={this.state.loaded}/>
            <div className="row">
                <div className="xs12 sm6 p-0 repl-editor">
                    {this.state.loaded || <Loading/>}
                    <textarea id="repl-editor"
                              className={this.state.loaded ? '' : 'hidden'}
                              value={children}/>
                </div>
                <div className="xs12 sm6 p-0 repl-output">
                    {this.state.vNodes}
                </div>
            </div>
            <button className="button not-pad lg3 sm xs10" onClick={this.handleCompile}>Run Example Code</button>
        </div>
    }
}
