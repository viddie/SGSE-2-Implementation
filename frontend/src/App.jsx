import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header/header";
import React from 'react';
import Footer from "./footer/footer";
import Showroom from './article/showroom';
import Chat from './chat/chat';
import Login from './user/login';
import SignUp from './user/signUp';
import CreateArticle from './article/createArticle';
import ErrorPageNotFound from './notFoundError/routeNotFound';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import { useObserver, useLocalStore } from 'mobx-react-lite'

function App() {

  const store = useLocalStore(()=> ({
    loggedIn : false
  }))

  return useObserver(()=>(
    <BrowserRouter>
      <div className="App">
        <Header store={store}/>
        <div className = "mt-3">
        <Switch>
          <Route exact path='/'>
            <Showroom store={store} categories={["all"]}/>
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
            <React.Fragment>
              <Route exact path='/userChat' component={Chat}/>
              <Route exact path='/createArticle' component={CreateArticle}/>
            </React.Fragment>
            }
          <Route path='/404' component={ErrorPageNotFound} />
          <Redirect to='/404' />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  ));
}

export default App;
