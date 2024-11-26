import './App.css';
import Header from './components/Header.tsx';
import Navigation from './components/Navigation.tsx';
import Footer from './components/Footer.tsx';
import Comment from './components/Comment.tsx';

function App(): React.JSX.Element {
  return (
    <>
      <Header />
      <Navigation />
      <Comment />
      <Footer />
    </>
  );
}

export default App;
