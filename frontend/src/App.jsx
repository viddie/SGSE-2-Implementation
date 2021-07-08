import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header/header";
import Footer from "./footer/footer";
import Showroom from './article/showroom';
import Chat from './chat/chat';
import Login from './user/login'
import SignUp from './user/signUp'
import {Switch, BrowserRouter, Route} from 'react-router-dom';

const state = {
  loggedIn : false
}


function App() {
  return (
    

    <BrowserRouter>
    <div className="App">
      <Header state={state}/>
      <div className = "mt-3">
        <Switch>
          <Route exact path='/'>
            <Showroom categories={["all"]}/>
          </Route>
          <Route exact path='/login'>
            <Login state={state}></Login>
          </Route>
          <Route exact path='/chat'>
            <Chat></Chat>
          </Route>
          <Route path='/createAccount'>
            <SignUp></SignUp>
          </Route>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
