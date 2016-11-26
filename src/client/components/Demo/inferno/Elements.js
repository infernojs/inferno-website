import Inferno from 'inferno'
import Component from 'inferno-component'
import { easeOutCubic } from '../system/utils'

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
            left: position[0] - size,
            top: position[1] - size
        }
        return <div className={'field ' + className} style={style}/>
    }
}

export class ParticleComponent extends Component {
    static contextTypes() {
        return {
            round(){}
        }
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.position[0]|0 !== nextProps.position[0]|0
        || this.props.position[1]|0 !== nextProps.position[1]|0) {
            return true
        }
        return false
    }

    render({ position, lifetime, lifetimeMax, simplexVal }) {
        const t = (lifetime / lifetimeMax)
        const red = easeOutCubic(1 - t) * 255 //(220 + lifetime - Math.pow(lifetime/5, 1.5))|0
        const green = easeOutCubic(1 - Math.min(1, t * 2)) * 255
        const blaw = easeOutCubic(1 - Math.min(1, t * 5)) * 255
        const radius = (red*10)|0
        const fill = `rgb(${red|0}, ${green|0}, ${blaw|0})`

        const style = {
            backgroundColor: fill,
            height: (red / 20)|0,
            width: (red / 20)|0,
            top: position[1]|0,
            left: position[0]|0
        }
        return Inferno.createVNode(2, 'div',  {
            id: simplexVal,
            className: 'particle' + (this.context.round ? 'round' : ''),
            style
        })
    }
}

