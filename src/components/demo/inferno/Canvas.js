import {Component} from 'inferno';
import perfMonitor from '../system/perfMonitor';
import Emitter from '../system/Emitter';
import {Field, getColors, remove, Vector} from '../system/utils';
//import { ParticleComponent } from './Elements'
import isPassive from '../../utils/isPassive';

const pool = [];
const field = new Field([
  0,
  0
], -30);

export default class Canvas extends Component {
  constructor() {
    super();
    this.i = 0;
    this.state = {
      mouse: [
        0,
        0
      ],
      particles: []
    };
  }

  componentDidMount() {

    // this.tmpCanvas = document.createElement('canvas')
    // this.tmpCtx = this.tmpCanvas.getContext('2d')
    // this.tmpCtx.beginPath()
    // this.tmpCtx.arc(50, 50, 25, 0, 2 * Math.PI)
    // this.tmpCtx.fillStyle = 'rgb(255, 220, 30)'
    // this.tmpCtx.fill()
    // this.tmpCtx.closePath()

    this.canvas.addEventListener('mousemove', this.onMouseMove, isPassive);
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.canvas.style.backgroundColor = 'rgb(0, 0, 0)';

    this.ctx = this.canvas.getContext('2d');

    perfMonitor.startFPSMonitor();
    //perfMonitor.startMemMonitor()
    perfMonitor.initProfiler('update');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paused !== this.props.paused) {
      window.requestAnimationFrame(this.loop);
    }
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMouseMove, isPassive);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.paused === false;
  }

  onMouseMove = (e) => {
    field.position[0] = e.offsetX;
    field.position[1] = e.offsetY;
    this.setState({
      mouse: [
        e.offsetX,
        e.offsetY
      ]
    });
  };

  drawParticle(x, y, size, color, opacity) {
    //this.ctx.drawImage(this.tmpCanvas, x, y, size*5, size*5)

    this.ctx.beginPath();
    this.ctx.globalAlpha = opacity;
    this.ctx.arc(x, y, size, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  update = () => {
    const { lifetime, emissionRate } = this.props;
    const { particles } = this.state;

    // Emit particles
    for (let j = 0; j < emissionRate; j++) {
      particles.push(Emitter.emit(lifetime));
    }

    this.ctx.clearRect(0, 0, 400, 400);

    // Update
    for (var i in particles) {
      let p = particles[i];
      let life = 1 - (p.lifetime / p.lifetimeMax);

      p.lifetime += 1;

      // If we're out of bounds, drop this particle and move on to the next
      if (life < 0.1) {
        //remove(particles, p)
        continue;
      }

      Vector.submitToFields(p, field);
      Vector.update(p);

      // Draw
      const colors = getColors(1 - life);
      this.drawParticle(p.position[0] | 0, p.position[1] | 0, 5, `rgb(${colors.join(',')})`, life);
    }

    window.requestAnimationFrame(this.loop);
  };

  loop = () => {
    if (!this.props.paused) {
      perfMonitor.startProfile('update');
      this.update(this.ctx);
      perfMonitor.endProfile('update');
    }

    setInterval(() => {
      const { particles } = this.state;
      for (var i in particles) {
        let p = particles[i];
        let life = 1 - (p.lifetime / p.lifetimeMax);
        if (life < 0.1) {
          remove(particles, p);
        }
      }
    }, 2000);
  };

  render() {
    const { particles } = this.state;
    return <div>
      <ParticleCounter count={particles.length}/>
      <canvas ref={c => this.canvas = c}/>
      {/*<ParticleWrapper items={particles} round={this.props.round}/>*/}
    </div>;
  }
}

// function ParticleWrapper({ items, round }) {
//   return <div id="demo-canvas" style={window.demo}>
//     {items.map((data, i) => {
//       const colors = getColors(data.lifetime / data.lifetimeMax)
//       const style = {
//         backgroundColor: `rgb(${colors.join(',')})`,
//         height: (colors[0] * 0.05) | 0,
//         width: (colors[0] * 0.05) | 0,
//         top: data.position[1] | 0,
//         left: data.position[0] | 0
//       }
//       return <div key={i} className={'particle' + (round ? ' round' : '')} style={style}/>
//     })}
//   </div>
// }

class ParticleCounter extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.count !== nextProps.count;
  }

  render() {
    return <div className="demo-counter">
      Particles ({this.props.count})
    </div>;
  }
}
