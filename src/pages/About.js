import Inferno from 'inferno'

export default function() {
	if (process.env.BROWSER) {
		document.title = 'About'
	}
    return <div className="p-3">
        <h1>Inferno-website</h1>
        <p>{'Based on '}
            <a href="https://github.com/nightwolfz/inferno-starter" target="_blank" rel="noopener">
                https://github.com/nightwolfz/inferno-starter
            </a>
        </p>
    </div>
}
