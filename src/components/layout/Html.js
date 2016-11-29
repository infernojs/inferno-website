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
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="icon" href="/favicon.ico?v=ngg42qbKBN"/>
            <link href={`${serverURL}/build/bundle.css`} rel="stylesheet"/>
        </head>
        <body>
            {/* Our content rendered here */}
            <div id="root"/>

            {/* Bundled JS */}
            <script src={`${serverURL}/build/bundle.js`}/>
        </body>
    </html>
}
