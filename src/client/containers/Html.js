import Inferno from 'inferno'

export default function({ hostname, children }) {
    const devServerURL = process.env.DEV ? `http://${hostname}:8082` : ''

    return <html>
        <head>
            <meta charSet="utf-8"/>
            <title>Inferno</title>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="icon" href="/favicon.ico?v=ngg42qbKBN"/>
            <link href={devServerURL + '/build/bundle.css'} rel="stylesheet"/>
        </head>
        <body>
            {/* Our content rendered here */}
            <div id="root">
                {children}
            </div>

            {/* Bundled JS */}
            <script src={devServerURL + '/build/bundle.js'}/>
        </body>
    </html>
}
