import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header/header";
import React from 'react';
import Footer from "./footer/footer";
import Showroom from './article/showroom';
import Chat from './chat/chat';
import Login from './user/login'
import SignUp from './user/signUp'
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import { useObserver, useLocalStore } from 'mobx-react-lite'





function App() {

  const store = useLocalStore = (()=> ({
    loggedIn : false
  }))
  
  return useObserver(()=>(
    <BrowserRouter>
    <div className="App">
      <Header />
      <div className = "mt-3">
        <Switch>
          <Route exact path='/'>
            <Showroom categories={["all"]}/>
          </Route>
          {!store.loggedIn ?
          <React.Fragment>
          <Route exact path='/login'>
            <Login ></Login>
          </Route>
          <Route exact path='/createAccount'>
            <SignUp></SignUp>
          </Route>
          </React.Fragment>
           :
           <Route exact exact path='/userChat'>
            <Chat></Chat>
          </Route>
           }
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  ));
}

export default App;
