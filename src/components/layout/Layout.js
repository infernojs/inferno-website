import Inferno from 'inferno'
import { IndexLink, Link } from 'inferno-router'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

export default function({ children }) {
    return <div>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
    </div>
}
