import Inferno from 'inferno'
import Component from 'inferno-component'

if (process.env.BROWSER) {
    window.Inferno = Inferno;
}

export default class Scripts extends Component {

    componentDidMount() {
        // Execute code when Babel is available
        if (!window.compiler) {
            Object.defineProperty(window, 'Babel', {
                writeable: true,
                set(val) {
                    require.ensure([], function(require){
                        window.compiler = val
                        window.compiler.registerPlugin('babel-plugin-inferno', require('babel-plugin-inferno'))
                    })
                }
            })
        }
    }

    render({ loaded }) {
        return <div>
            <ScriptLoader condition={!window.compiler}
                          src="//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.19.0/babel.min.js"/>
            <ScriptLoader condition={!window.editor}
                          src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js"/>
            <ScriptLoader condition={!window.editor && loaded}
                          onload={() => window.editor.setOption('mode', 'javascript')}
                          src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js"/>
            <link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css" rel="stylesheet"/>
            <link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css" rel="stylesheet"/>
        </div>
    }
}

function ScriptLoader({ condition, src, onload }) {
    const noop = () => {}
    if (condition) {
        return <script src={src} onLoad={onload || noop}/>
    }
    return null
}
