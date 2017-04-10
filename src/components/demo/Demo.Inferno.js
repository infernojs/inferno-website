import Inferno from 'inferno'
import Component from 'inferno-component'
import { Controller } from './inferno/Elements'
import Canvas from './inferno/Canvas'

if (process.env.BROWSER) {
    window.demo = {
        width: 300,
        height: 300
    }
}

export default class Demo extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            paused: true,
            round: false,
            lifetime: 60,
            emissionRate: 3
        }
    }

    componentDidMount() {
        this.setState({ paused: false })
    }

    componentWillUnmount() {
        this.setState({ paused: true })
    }

    setPause = (e) => {
        e.stopPropagation();
        this.setState({ paused: !this.state.paused });
    }
    setEmission = (e) => this.setState({ emissionRate: e.target.value|0 })
    setLifetime = (e) => this.setState({ lifetime: e.target.value|0 })
    setRounded = (e) => this.setState({ round: !this.state.round })

    render() {
        const { paused, lifetime, emissionRate, round } = this.state

        return <section id="demo-wrapper">
            <button onClick={this.setPause}>
                {paused ? 'Resume' : 'Pause'}
            </button>

            <Controller
            setRounded={this.setRounded}
            setLifetime={this.setLifetime}
            setEmission={this.setEmission}
            emissionRate={emissionRate}
            lifetime={lifetime}
            round={round}
            />

            <Canvas
            round={round}
            paused={paused}
            lifetime={lifetime}
            emissionRate={emissionRate}
            />
        </section>
    }
}
