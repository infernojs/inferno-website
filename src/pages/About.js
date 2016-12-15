import Inferno from 'inferno'

export default function() {
	if (process.env.BROWSER) {
		document.title = 'About'
	}
    return <div className="padding">
        <h1>Inferno-website</h1>
        <section className="container">
            <p>Based on</p>
            <p>
                <a href="https://github.com/nightwolfz/inferno-starter" target="_blank" rel="noopener">
                    https://github.com/nightwolfz/inferno-starter
                </a>
            </p>
        </section>
    </div>
}
