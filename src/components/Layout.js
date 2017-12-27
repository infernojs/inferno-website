import Inferno from 'inferno'
import Header from './common/Header'
import Footer from './common/Footer'

export default function(props) {
  return (
    <div>
      <Header/>
      <main className="container">
        {props.children}
      </main>
      <Footer/>
    </div>
  )
}
