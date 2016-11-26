import Inferno from 'inferno'
import Component from 'inferno-component'
import { Controller } from './inferno/Elements'
import Canvas from './inferno/Canvas'

if (process.env.BROWSER) {
    window.lifetime = 100
    window.demo = {
        width: 400,
        height: 400
    }
}

export default class InfernoFlame extends Component {
    constructor() {
        super()
        this.state = {
            paused: true,
            round: false,
            lifetime: window.lifetime,
            emissionRate: 2
        }
    }

    componentDidMount() {
        this.setState({ paused: false })
    }

    getChildContext() {
        return this.state;
    }

    pause = () => {
        this.setState({ paused: !this.state.paused })
    }

    setEmission = (e) => this.setState({ emissionRate: e.target.value|0 })
    setLifetime = (e) => this.setState({ lifetime: e.target.value|0 })
    setRounded = (e) => this.setState({ round: !this.state.round })

    render() {
        const { paused, lifetime, emissionRate } = this.state

        return <section id="demo-wrapper">
            <button onClick={this.pause}>
                {paused ? 'Resume' : 'Pause'}
            </button>

            <Controller
            pause={this.pause}
            setRounded={this.setRounded}
            setLifetime={this.setLifetime}
            setEmission={this.setEmission}
            />

            <Canvas
            paused={paused}
            lifetime={lifetime}
            emissionRate={emissionRate}
            />
        </section>
    }
}
