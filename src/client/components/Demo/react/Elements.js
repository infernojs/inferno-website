

export class Canvas extends React.Component {
    render() {
        const { p, f } = this.props

        const _particles = p.map(props => React.createElement(ParticleComponent, props))
        const _fields = f.map(props => React.createElement(FieldComponent, props))

        return React.createElement('div', {}, _particles.concat(_fields))
    }
}

export class FieldComponent extends React.Component {
    shouldComponentUpdate(nextProps) {
        return false
    }
    render() {
        const { position, mass, className } = this.props
        /*const sign = mass > 0 ? '+' : '-'
        const size = Math.abs(mass)
        const style = {
            height: size * 3,
            width: size * 3,
            top: position.y - size,
            left: position.x - size
        }*/
        //return <div className={`field ${className}`} style={style}>{sign}</div>
        return React.createElement('div', {})
    }
}

export class ParticleComponent extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.position.x|0 !== nextProps.position.x|0
        || this.props.position.y|0 !== nextProps.position.y|0) {
            return true
        }
        return false
    }

    render() {
        const { position, lifetime, lifetimeLeft } = this.props
        const style = {
            //backgroundColor: `rgba(${220 + lifetime|0}, ${lifetime*3}, 0, ${lifetimeLeft})`,
            backgroundColor: `rgb(${220 + lifetime|0}, ${lifetime*3}, 0)`,
            top: position.y,
            left: position.x
        }
        return React.createElement('div',  {
            className: 'particle',
            style
        })
    }
}

