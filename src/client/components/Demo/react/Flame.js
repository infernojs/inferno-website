import Vector from './Vector'
import Particle from './Particle'
import Emitter from './Emitter'
import Field from './Field'
import { Canvas, FieldComponent, ParticleComponent } from './Elements'
import perfMonitor from './perf-monitor'

// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
const width = 400;
const height = 400;
const center = (width / 2) | 0;
const cellsPerRow = 10

let particles = []
const emitters = [
    new Emitter(new Vector(center - 10, center + 50), Vector.fromAngle(-1.9, 2), 0.4),
    new Emitter(new Vector(center, center + 50), Vector.fromAngle(-1.5, 2.5), 0.1),
    new Emitter(new Vector(center + 10, center + 50), Vector.fromAngle(-1.1, 2), 0.4),
]

// Add one field located at `{ x : 400, y : 230}` (to the right of our emitter)
// that has a mass of `-140`
const fields = [
    new Field(new Vector(0, 0), -20),
    new Field(new Vector(center - 70, 180), -20),
    new Field(new Vector(center, 80), 20),
    new Field(new Vector(center + 70, 180), -20),
];

export default class Flame extends React.omponent {
    constructor() {
        super()
        this.state = {
            paused: false,
            maxParticles: 600, // experiment! 20,000 provides a nice galaxy
            minLifetime: 80,
            emissionRate: 2 // how many particles are emitted each frame
        }
    }

    componentDidMount() {
        this.loop();
        const canvas = document.getElementById('demo-canvas')
        canvas.addEventListener('mousemove', (e) => {
            fields[0].position.x = e.offsetX
            fields[0].position.y = e.offsetY
        })
        perfMonitor.startFPSMonitor();
        perfMonitor.startMemMonitor();
        perfMonitor.initProfiler('flame update');
    }

    changeMaxParticles = (e) => this.setState({ maxParticles: parseInt(e.target.value) })
    changeMinLifetime = (e) => this.setState({ minLifetime: parseInt(e.target.value) })

    update = () => {
        const { maxParticles, minLifetime, emissionRate } = this.state

        // if we're at our max, stop emitting.
        if (particles.length <= maxParticles) {
            for (let i = 0; i < emitters.length; i++) {
                for (let j = 0; j < emissionRate; j++) {
                    particles.push(emitters[i].emitParticle(minLifetime));
                }
            }
        }

        // a new array to hold particles within our bounds
        const currentParticles = [];

        for (let i in particles) {
            let particle = particles[i];
            let pos = particle.position;
            let origin = particle.origin;
            particle.lifetime -= 1

            // If we're out of bounds, drop this particle and move on to the next
            if (particle.lifetime < 0) {
                //particle.deactivate()
                continue
            }
            // Update velocities
            particle.submitToFields(fields);
            particle.move();

            // Add this particle to the list of current particles
            currentParticles.push(particle)
        }

        // Update our global particles, CLEARING old particles to be collected
        particles = currentParticles

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

    render() {
        const { paused, maxParticles, minLifetime } = this.state
        const canvasStyle = { width, height }

        return <div>
            <button onClick={this.pause}>{paused ? 'Resume' : 'Pause'}</button>
            <table>
                <tr>
                    <td width="100">maxParticles:</td>
                    <td width="100">{particles.length} / {maxParticles}</td>
                    <td><input type="range"
                               step={100}
                               min={100}
                               max={1000}
                               defaultValue={maxParticles}
                               onChange={this.changeMaxParticles}/>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="100">minLifetime:</td>
                    <td width="100">{minLifetime}</td>
                    <td><input type="range"
                               step={5}
                               min={10}
                               max={100}
                               defaultValue={minLifetime}
                               onChange={this.changeMinLifetime}/>
                    </td>
                </tr>
            </table>
            <hr/>
            <div id="demo-canvas" style={canvasStyle}>

                <Canvas p={particles} f={fields}/>
            </div>
        </div>
    }
}
