import Inferno from 'inferno'
import Component from 'inferno-component'
import { Controller } from './Elements'
import { Canvas } from './inferno/Elements'
import { remove } from './system/utils'
import perfMonitor from './system/perfMonitor'
import Particle from './system/Particle'
import Emitter from './system/Emitter'

export default class InfernoFlame extends Component {
    constructor() {
        super()
        this.state = {
            paused: false,
            round: false,
            mouse: [0, 0],
            maxParticles: 400,
            minLifetime: window.lifetime,
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

    onMouseMove = (e) => {
        window.fields[0].position[0] = e.offsetX
        window.fields[0].position[1] = e.offsetY
        this.setState({
            mouse: [e.offsetX, e.offsetY]
        })
    }

    update = () => {
        const { minLifetime, emissionRate } = this.state

        // Emit particles
        for (let j = 0; j < emissionRate; j++) {
            const newParticle = Emitter.emitParticles(minLifetime)
            window.particles.push(newParticle)
        }

        // Update velocities
        for (let i in window.particles) {
            let p = window.particles[i]
            //particle.submitToFields(fields);
            Particle.update(p);
        }

        // recycle
        for (let i in window.particles) {
            let p = window.particles[i]
            p.lifetime += 1

            // If we're out of bounds, drop this particle and move on to the next
            if (p.lifetime > p.lifetimeMax) {
                remove(window.particles, p)
                continue
            }
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
        return <section id="demo-wrapper">
            <Controller
                state={this.state}
                pause={this.pause}
                setRounded={this.setRounded}
                setLifetime={this.setLifetime}
                setEmissionRate={this.setEmissionRate}
            />
            <div id="demo-canvas" style={window.demo}>
                <Canvas fields={window.fields}/>
            </div>
        </section>
    }
}
