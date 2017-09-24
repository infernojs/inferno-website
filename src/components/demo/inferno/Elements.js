import Inferno from 'inferno'
import Component from 'inferno-component'

export class Controller extends Component {
  render() {
    const {
      setRounded, setEmission, setLifetime, emissionRate, lifetime, round
    } = this.props

    return (
      <div className="demo-setting">
        <Slider step={1} min={1} max={5} text="Emission Rate"
                label={emissionRate} defaultValue={emissionRate}
                onChange={setEmission}/>

        <Slider step={10} min={10} max={100} text="Lifetime"
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
