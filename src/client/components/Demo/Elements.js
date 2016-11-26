import Inferno from 'inferno'
import Component from 'inferno-component'

export class Controller extends Component {
    static contextTypes() {
        return { state(){} }
    }

    render() {
        const { setRounded, setEmission, setLifetime } = this.props
        const { emissionRate, lifetime, round } = this.context

        return (
        <div>
            <Slider step={1} min={1} max={10} text="Emission Rate"
                    label={emissionRate} defaultValue={emissionRate}
                    onChange={setEmission}/>

            <Slider step={10} min={10} max={200} text="Lifetime"
                    label={lifetime} defaultValue={lifetime}
                    onChange={setLifetime}/>
            <div>
                <span>Rounded Corners</span>
                <span>
                <input type="checkbox" checked={round} onChange={setRounded}/>
            </span>
            </div>
        </div>
        )
    }
}

export function Slider({ step, min, max, text, label, defaultValue, onChange }) {
    return (
    <div className="demo-setting">
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
