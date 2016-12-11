import Inferno from 'inferno'

/**
 * This component is rendered on the server side
 */
export default function({ hostname, config }) {
    const serverURL = process.env.DEV ? `http://${hostname}:${config.http.port + 2}` : ''
    return <html>
        <head>
            <meta charSet="utf-8"/>
            <title>Inferno</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
            <meta name="description" content="An extremely fast React-like javascript library for building modern user interfaces."/>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Inferno" />
            <meta property="og:description" content="An extremely fast React-like javascript library for building modern user interfaces." />
            <meta property="og:url" content={ `${serverURL}` } />
            <meta property="og:site_name" content="Inferno.js" />
            <meta property="og:image" content={ `${serverURL}/assets/share.png` } />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content="An extremely fast React-like javascript library for building modern user interfaces." />
            <meta name="twitter:title" content="Inferno" />
            <meta name="twitter:site" content="@InfernoJS" />
            <meta name="twitter:image" content={ `${serverURL}/assets/share.png` } />
            <meta name="twitter:creator" content="@InfernoJS" />
            <link href={ `${serverURL}/build/bundle.css` } rel="stylesheet"/>
            <link rel="icon" href="/assets/favicon.png?v=ngg42qbKBK"/>
        </head>
        <body>
            <div id="root"/>
            <script src={`${serverURL}/build/bundle.js`}/>
        </body>
    </html>
}
