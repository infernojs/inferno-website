import Header from './common/Header';
import Footer from './common/Footer';

export default function({match, children}) {
  return (
    <div>
      <Header match={match} />
      <main className="container">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
