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

const store = useLocalStore(()=> ({
  loggedIn : false
}))



function App() {
  return useObserver(()=>(
    <BrowserRouter>
    <div className="App">
      <Header store={store}/>
      <div className = "mt-3">
        <Switch>
          <Route exact path='/'>
            <Showroom categories={["all"]}/>
          </Route>
          {!store.loggedIn ?
          <React.Fragment>
          <Route exact path='/login'>
            <Login store={store}></Login>
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
