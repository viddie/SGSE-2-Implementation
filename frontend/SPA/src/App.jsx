import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header";
import Filter from './components/filter';
import Footer from './components/footer';
import Showroom from './article/showroom';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className = "mt-3">
      <Filter/>
      <Showroom/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
