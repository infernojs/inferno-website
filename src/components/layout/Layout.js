import Inferno from 'inferno'
import { IndexLink, Link } from 'inferno-router'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

function onComponentDidMount(domNode) {
    console.warn('onComponentDidMount', domNode)
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('/assets/static/serviceWorker.js')
                 .then(function() {
                     console.log("Service Worker Registered");
                 });
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
