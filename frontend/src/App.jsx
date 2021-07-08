import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header/header";
import Showroom from './article/showroom';
import Chat from './chat/chat';
import Login from './user/login'
import {Switch, BrowserRouter, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <div className = "mt-3">
        <Switch>
          <Route exact path='/'>
            <Showroom categories={["all"]}/>
          </Route>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/chat'>
            <Chat></Chat>
          </Route>
          <Route path='/createAccount'/>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;