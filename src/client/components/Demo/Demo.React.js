import Vector from './system/Vector'
import { Canvas } from './inferno/Elements'
import { emitters, fields, height, width } from './system/setup'
import perfMonitor from './system/perfMonitor'

if (process.env.BROWSER) {
    window.pool = []
}

let particles = []
const defaultParticles = 400
const defaultLifetime = 100

class InfernoFlame extends React.Component {
    constructor() {
        super()
        this.state = {
            paused: false,
            round: false,
            mouse: new Vector(0, 0),
            maxParticles: 400,
            minLifetime: lifetime,
            emissionRate: 2
        }
    }

    componentDidMount() {
        this.loop();
        const canvas = document.getElementById('demo-canvas')
        canvas.addEventListener('mousemove', this.onMouseMove)
        perfMonitor.startFPSMonitor();
        perfMonitor.startMemMonitor();
        perfMonitor.initProfiler('flame update');
    }

    static childContextTypes = {
        round(){}
    }

    getChildContext() {
        return { round: this.state.round };
    }

    remove(arr, value) {
        if (arr.indexOf(value)!==-1) {
            arr.splice(arr.indexOf(value), 1);
        }
    }

    onMouseMove = (e) => {
        fields[0].position.x = e.offsetX
        fields[0].position.y = e.offsetY
        this.setState({
            mouse: new Vector(e.offsetX, e.offsetY)
        })
    }

    changeMaxParticles = (e) => this.setState({ maxParticles: parseInt(e.target.value) })
    changeMinLifetime = (e) => this.setState({ minLifetime: parseInt(e.target.value) })

    addEmitter = (e) => {
        //emitters.push(new Emitter(new Vector(e.offsetX, e.offsetY), Vector.fromAngle(-1.5, 2), 0.1))
    }

    update = () => {
        const { maxParticles, minLifetime, emissionRate } = this.state

        //const aliveParticles = []
        /*if (Math.round() > 0.3) {
            return null
        }*/

        // Emit particles
        for (let i in emitters) {
            for (let j = 0; j < emissionRate; j++) {
                const newParticle = emitters[i].emit(minLifetime)
                particles.push(newParticle)
            }
        }

        for (let i in particles) {
            let particle = particles[i];
            particle.lifetime += 1

            // If we're out of bounds, drop this particle and move on to the next
            if (particle.lifetime > particle.lifetimeMax) {
                this.remove(particles, particle)
                continue
            }
            // Keep these
            //aliveParticles.push(particle)

            // Update velocities
            //particle.submitToFields(fields);
            particle.update();
        }

        //particles = aliveParticles
        window.requestAnimationFrame(this.loop)
    }

    loop = () => {
        if (!this.state.paused) {
            perfMonitor.startProfile('flame update');
            this.update();
            this.forceUpdate()
            perfMonitor.endProfile('flame update');
        }
    }

    pause = () => {
        const paused = !this.state.paused
        this.setState({ paused })
        if (!paused) {
            window.requestAnimationFrame(this.loop)
        }
    }

    setEmissionRate = (e) => this.setState({ emissionRate: parseInt(e.target.value) })
    setLifetime = (e) => this.setState({ minLifetime: parseInt(e.target.value) })
    setRounded = (e) => this.setState({ round: !this.state.round })

    render() {
        const { paused, mouse, maxParticles, minLifetime, emissionRate } = this.state
        const canvasStyle = { width, height }

        return <section id="demo-wrapper">
            <button onClick={this.pause}>{paused ? 'Resume' : 'Pause'}</button>
            <div>
                <span>Particles ({particles.length})</span>
                <span></span>
            </div>
            <Slider step={1}
                    min={1}
                    max={10}
                    text={'Emission Rate'}
                    label={emissionRate}
                    defaultValue={emissionRate}
                    onChange={this.setEmissionRate}/>

            <Slider step={10}
                    min={10}
                    max={200}
                    text={'Lifetime'}
                    label={minLifetime}
                    defaultValue={lifetime}
                    onChange={this.setLifetime}/>
            <div>
                <span>Rounded Corners</span>
                <span>
                    <input type="checkbox" checked={this.state.round} onChange={this.setRounded}/>
                </span>
            </div>
            <hr/>
            <div id="demo-canvas" style={canvasStyle} onClick={this.addEmitter()}>
                <Canvas p={particles} f={fields}/>
            </div>
        </section>
    }
}

function Slider({ step, min, max, minLifetime, value, onChange }) {
    return React.createElement('table', {},
        React.createElement('tbody', {},
        [
            React.createElement('tr', { key: 10 },
            React.createElement('td', { key: 11, width: 100 }, 'minLifetime'),
            React.createElement('td', { key: 12, width: 100 }, value),
            React.createElement('td', { key: 13 },
                React.createElement('input', { type: 'range', step, min, max, onChange })
            ))
        ])
    )
}

ReactDOM.render(
    React.createElement(InfernoFlame),
    document.getElementById('root')
)
