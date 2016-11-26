import Inferno from 'inferno'
import Component from 'inferno-component'

export class Canvas extends Component {
    render() {
        const { p, f } = this.props
        return Inferno.createVNode(2, 'div', {},
            p.map(d => Inferno.createVNode(4, ParticleComponent, d)),
            f.map(d => Inferno.createVNode(4, FieldComponent,
            {
                position: d.position,
                mass: d.mass,
                className: d.className
            }))
        )
    }
}

export class FieldComponent extends Component {
    shouldComponentUpdate(nextProps) {
        return false
    }
    render({ position, mass, className }) {
        const sign = mass > 0 ? '+' : '-'
        const size = Math.abs(mass)
        const style = {
            height: size * 3,
            width: size * 3,
            top: position.y - size,
            left: position.x - size
        }
        return <div className={'field ' + className} style={style}/>
    }
}

function easeOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

export class ParticleComponent extends Component {
    static contextTypes() {
        return {
            round(){}
        }
    }
    /*shouldComponentUpdate(nextProps) {
        if (this.props.position.x|0 !== nextProps.position.x|0
        || this.props.position.y|0 !== nextProps.position.y|0) {
            return true
        }
        return false
    }*/

    render({ position, lifetime, maxlifetime, simplexVal }) {

        const t = (lifetime / maxlifetime)
        const red = easeOutCubic(1 - t) * 255 //(220 + lifetime - Math.pow(lifetime/5, 1.5))|0
        const green = easeOutCubic(1 - Math.min(1, t * 2)) * 255
        const blaw = easeOutCubic(1 - Math.min(1, t * 5)) * 255
        const radius = (red*10)|0
        const fill = `rgb(${red|0}, ${green|0}, ${blaw|0})`

        const style = {
            backgroundColor: fill,
            height: (red / 20)|0,
            width: (red / 20)|0,
            top: position.y,
            left: position.x
        }
        return Inferno.createVNode(2, 'div',  {
            id: simplexVal,
            className: 'particle', // + (this.context.round ? 'round' : ''),
            style
        })
        /*return <svg className="particle"
                    style={style}
                    viewBox={`0 0 ${radius*2} ${radius*2}`}>
            <circle cx={radius} cy={radius} r={radius}/>
        </svg>*/
    }
}

