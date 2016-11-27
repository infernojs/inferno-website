import Inferno from 'inferno'

function componentDidMount() {
    console.warn('ddddd')
    document.title = 'Home'
}

export default function() {
    return <div onComponentDidMount={componentDidMount}>
        <h1>Inferno-website</h1>
        <section className="container">
            <p>Based on</p>
            <p>
                <a href="https://github.com/nightwolfz/inferno-starter" target="_blank">
                    https://github.com/nightwolfz/inferno-starter
                </a>
            </p>
        </section>
    </div>
}
