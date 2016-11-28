import { Controller } from './react/Elements'
import Canvas from './react/Canvas'

if (process.env.BROWSER) {
    window.demo = {
        width: 400,
        height: 400
    }
}

class Demo extends React.Component {
    constructor() {
        super()
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

    setPause = () => this.setState({ paused: !this.state.paused })
    setEmission = (e) => this.setState({ emissionRate: e.target.value|0 })
    setLifetime = (e) => this.setState({ lifetime: e.target.value|0 })
    setRounded = (e) => this.setState({ round: !this.state.round })

    render() {
        const { paused, lifetime, emissionRate, round } = this.state

        return React.createElement('section', { id: 'demo-wrapper' }, [
            React.createElement('button', { key: 1, onClick: this.setPause }, paused ? 'Resume' : 'Pause'),
            React.createElement(Controller, {
                key: 2,
                setRounded:  this.setRounded,
                setLifetime:  this.setLifetime,
                setEmission:  this.setEmission,
                emissionRate, lifetime, round
            }),
            React.createElement(Canvas, { key: 3, round, paused, lifetime, emissionRate })
        ])
    }
}

ReactDOM.render(
    React.createElement(Demo),
    document.getElementById('react-root')
)
