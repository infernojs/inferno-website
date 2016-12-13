import Inferno from 'inferno'
import { IndexLink, Link } from 'inferno-router'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

function onComponentDidMount(domNode) {
    console.log('Service Worker Register')
    if('serviceWorker' in navigator) {
        const sw = navigator.serviceWorker

        sw.register('/service/sw.js', {
        }).then(() => {
            console.log("Service Worker Registered")
        })

        sw.ready.then(function(registration) {
            console.log('Service Worker Ready')
        })
    }
}

export default function({ children }) {
    return <div>
        <Header/>
        <main>
            {children}
        </main>
        <Footer onComponentDidMount={onComponentDidMount}/>
    </div>
}
