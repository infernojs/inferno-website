import Inferno from 'inferno'
import Component from 'inferno-component'
import Vector from './shared/Vector'
import { Canvas } from './inferno/Elements'
import { emitters, fields, height, width } from './shared/setup'
import perfMonitor from './shared/perf-monitor'

if (process.env.BROWSER) {
    window.pool = []
}

let particles = []
const defaultParticles = 400
const defaultLifetime = 100

export default class InfernoFlame extends Component {
    constructor() {
        super()
        this.state = {
            paused: false,
            round: false,
            mouse: new Vector(0, 0),
            maxParticles: 400,
            minLifetime: defaultLifetime,
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
                const newParticle = emitters[i].emitParticles(minLifetime)
                particles.push(newParticle)
            }
        }

        for (let i in particles) {
            let particle = particles[i];
            particle.lifetime += 1

            // If we're out of bounds, drop this particle and move on to the next
            if (particle.lifetime > particle.maxlifetime) {
                this.remove(particles, particle)
                continue
            }
            // Keep these
            //aliveParticles.push(particle)

            // Update velocities
            //particle.submitToFields(fields);
            particle.move();
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
                    defaultValue={defaultLifetime}
                    onChange={this.setLifetime}/>
            <div>
                <span>Rounded Corners</span>
                <span>
                    <input type="checkbox" checked={this.state.round} onChange={this.setRounded}/>
                </span>
            </div>
            <hr/>
            <div id="demo-canvas" style={canvasStyle} onClick={this.addEmitter()}>
                {/*<VectorField mouse={mouse}/>*/}
                <Canvas p={particles} f={fields}/>
            </div>
        </section>
    }
}

function Slider({ step, min, max, text, label, defaultValue, onChange }) {
    return (
        <div className="demo-setting">
            <div>{text} ({label})</div>
            <div><input
                type="range"
                min={min}
                max={max}
                step={step}
                defaultValue={defaultValue}
                onChange={onChange}
            /></div>
        </div>
    )
}
