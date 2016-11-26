import Inferno from 'inferno'

export function Controller(props) {
    const { paused, mouse, round, maxParticles, minLifetime, emissionRate } = props.state
    const { pause, setRounded, setEmissionRate, setLifetime } = props

    return (
    <div>
        <button onClick={pause}>{paused ? 'Resume' : 'Pause'}</button>
        <div>
            Particles ({window.particles.length})
        </div>
        <Slider step={1} min={1} max={10} text="Emission Rate"
                label={emissionRate} defaultValue={emissionRate}
                onChange={setEmissionRate}/>

        <Slider step={10} min={10} max={200} text="Lifetime"
                label={minLifetime} defaultValue={window.lifetime}
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

export function Slider({ step, min, max, text, label, defaultValue, onChange }) {
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
