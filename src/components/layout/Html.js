import Inferno from 'inferno'

/**
 * This component is rendered on the server side
 */
export default function({ hostname, config, children }) {
    const serverURL = `//${hostname}`
    const bundleURL = process.env.DEV ? `${serverURL}:${config.http.port + 2}` : ''

    return <html>
        <head>
            <meta charSet="utf-8"/>
            <title>Inferno</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
            <meta name="description" content="An extremely fast React-like javascript library for building modern user interfaces."/>
            <meta name="theme-color" content="#ffffff"/>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Inferno" />
            <meta property="og:description" content="An extremely fast React-like javascript library for building modern user interfaces." />
            <meta property="og:url" content={ serverURL } />
            <meta property="og:site_name" content="Inferno.js" />
            <meta property="og:image" content="/assets/share.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content="An extremely fast React-like javascript library for building modern user interfaces." />
            <meta name="twitter:title" content="Inferno" />
            <meta name="twitter:site" content="@InfernoJS" />
            <meta name="twitter:image" content="/assets/share.png" />
            <meta name="twitter:creator" content="@InfernoJS" />
            <link rel="manifest" href="/assets/manifest.json"/>
            <script dangerouslySetInnerHTML={{
                __html: insertServiceWorker(true)
            }}/>
        </head>
        <body>
            <div id="root">{children && children}</div>
            <link href={ `${bundleURL}/build/bundle.css` } rel="stylesheet"/>
            <script src={`${bundleURL}/build/bundle.js`} async="async"/>
        </body>
    </html>
}

function insertServiceWorker(enabled) {
	if (!enabled) return ''

	return `
	if ('serviceWorker' in navigator) {
		const sw = navigator.serviceWorker
		console.debug('Worker: init')

		sw.register('/sw.js').then(() => {
			console.debug('Worker: registered')
		})

		sw.ready.then(function(registration) {
			console.debug('Worker: ready')
		})
	}`
}
