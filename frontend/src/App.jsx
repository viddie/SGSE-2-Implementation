import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderIn from "./components/headerLoggedIn";
import HeaderOut from "./components/headerLoggedOut"
import Filter from './components/filter';
import Showroom from './article/showroom';
import {Switch, BrowserRouter, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <HeaderIn/>
      <div className = "mt-3">
      <Filter/>
      <BrowserRouter>
      <Switch>
        <Route exact path='/cool' component={showroom} /> 
        <Route exact path='/hallo' component={random} />
      </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

const showroom = () => (
  <Showroom/>
)
const random = () => (
  <HeaderOut/>
)

export default App;
