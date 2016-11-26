import Inferno from 'inferno'
import Component from 'inferno-component'
import { easeOutCubic } from '../system/utils'

export class FieldComponent extends Component {
    shouldComponentUpdate(nextProps) {
        return false
    }
    render({ position, className }) {
        const style = {
            left: position[0],
            top: position[1]
        }
        return <div style={style}/>
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
            className: 'particle' + (this.context.round ? ' round' : ''),
            style
        })
    }
}

export class Controller extends Component {
    static contextTypes() {
        return { state(){} }
    }

    render() {
        const { setRounded, setEmission, setLifetime } = this.props
        const { emissionRate, lifetime, round } = this.context

        return (
        <div className="demo-setting">
            <Slider step={1} min={1} max={8} text="Emission Rate"
                    label={emissionRate} defaultValue={emissionRate}
                    onChange={setEmission}/>

            <Slider step={10} min={10} max={150} text="Lifetime"
                    label={lifetime} defaultValue={lifetime}
                    onChange={setLifetime}/>
            <div className="demo-slider">
                <label>
                    Rounded Corners
                    <input type="checkbox" checked={round} onChange={setRounded}/>
                </label>
            </div>
        </div>
        )
    }
}

export function Slider({ step, min, max, text, label, defaultValue, onChange }) {
    return (
    <div className="demo-slider">
        <div>{text} ({label})</div>
        <div>
            <input type="range"
                   min={min} max={max} step={step}
                   defaultValue={defaultValue}
                   onChange={onChange}/>
        </div>
    </div>
    )
}
