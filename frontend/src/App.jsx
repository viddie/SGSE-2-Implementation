import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderIn from "./components/headerLoggedIn";
import HeaderOut from "./components/headerLoggedOut"
import Filter from './components/filter';
import Showroom from './article/showroom';
import Chat from './chat/chat';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HeaderIn/>
      <div className = "mt-3">
      <Filter/>
      <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Showroom categories={["all"]}/>
        </Route>
        <Route exact path='/hallo' component={random} />
        <Route exact path='/zwiebeltasche' component={chatroom} />
      </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}
const random = () => (
  <HeaderOut/>
)
const chatroom = () => (
  <Chat/>
)

export default App;
