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
        <Route path='/'>
          <Showroom categories={["all"]}/>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='/chat'>
          <Chat></Chat>
        </Route>
        <Route path='/createAccount'/>
      </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
