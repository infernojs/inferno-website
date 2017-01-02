import Inferno from 'inferno'
import Component from 'inferno-component'

if (process.env.BROWSER) {
    window.Inferno = Inferno;
    window.Component = Component;
}

export default class Scripts extends Component {

    componentDidMount() {

        // Execute code when Babel is available
        let intval = setInterval(() => {
            if (window.Babel && !window.compiler) {
                require.ensure([], function(require){
                    window.compiler = window.Babel
                    window.compiler.registerPlugin('babel-plugin-inferno', require('babel-plugin-inferno'))
                })
                clearInterval(intval)
            }
        }, 50)
    }

    render({ loaded }) {
        return <div>
            <link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css" rel="stylesheet"/>
            <link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css" rel="stylesheet"/>
            <ScriptLoader condition={!window.compiler}
                          src="//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.19.0/babel.min.js"/>
            <ScriptLoader condition={!window.editor}
                          src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js"/>
            <ScriptLoader condition={window.editor && loaded}
                          onload={() => window.editor.setOption('mode', 'javascript')}
                          src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js"/>
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
