import { getColors } from '../system/utils'

export class ParticleComponent extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.x !== nextProps.x || this.props.y !== nextProps.y
    }
    render() {
        const { x, y, lifetime, lifetimeMax, round } = this.props
        const colors = getColors(lifetime / lifetimeMax)
        const style = {
            backgroundColor: `rgb(${colors.join(',')})`,
            height: (colors[0] * 0.05)|0,
            width: (colors[0] * 0.05)|0,
            top: y,
            left: x
        }
        return React.createElement('div',  {
            className: 'particle' + (round ? ' round' : ''),
            style
        })
    }
}

export class Controller extends React.Component {
    render() {
        const {
        setRounded,
        setEmission,
        setLifetime,
        emissionRate,
        lifetime,
        round
        } = this.props

        return React.createElement('div', { className: 'demo-setting' }, [
            React.createElement(Slider, {
                key: 'key-emission',
                step: 1,
                min: 1,
                max: 8,
                text: 'Emission Rate',
                label: emissionRate,
                defaultValue: emissionRate,
                onChange: setEmission
            }),
            React.createElement(Slider, {
                key: 'key-lifetime',
                step: 10,
                min: 10,
                max: 100,
                text: 'Lifetime',
                label: lifetime,
                defaultValue: lifetime,
                onChange: setLifetime
            }),
            React.createElement('div', {
                key: 'key-rounded',
                className: 'demo-slider'
            }, [
                React.createElement('label', {
                    key: 'key-rounded-1'
                }, 'Rounded Corners'),
                React.createElement('input', {
                    key: 'key-rounded-2',
                    type: 'checkbox',
                    checked: round,
                    onChange: setRounded,
                })
            ])
        ])
    }
}

export function Slider({ step, min, max, text, label, defaultValue, onChange }) {
    return React.createElement('div',  {
        className: 'demo-slider'
    }, [
        React.createElement('div', { key: 'slider-label' }, `${text} (${label})`),
        React.createElement('div', { key: 'slider-wrap' }, [
            React.createElement('input', {
                key: 'slider-input',
                type: 'range', min, max, step, defaultValue, onChange
            })
        ])
    ])
}
