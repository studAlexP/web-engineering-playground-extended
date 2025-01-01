import './App.css';
import Header from './components/Header.tsx';
import Navigation from './components/Navigation.tsx';
import Footer from './components/Footer.tsx';
import Article from './components/Article.tsx';
import Related from './components/Related.tsx';

function App(): React.JSX.Element {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <Article />
        <Related />
      </main>
      <Footer />
    </>
  );
}

export default App;
