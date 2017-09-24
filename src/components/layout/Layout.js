import Inferno from 'inferno'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

export default function(props) {
  return (
    <div>
      <Header/>
      <main>
        {props.children}
      </main>
      <Footer/>
    </div>
  )
}
