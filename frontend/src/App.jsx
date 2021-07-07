import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header/header";
import Showroom from './article/showroom';
import Chat from './chat/chat';
import Login from './user/login'

import {Switch, BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className = "mt-3">
      <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Showroom categories={["all"]}/>
        </Route>
        <Route exact path='/#login'>
          <Login></Login>
        </Route>
        <Route exact path='/#createAccount'/>
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
