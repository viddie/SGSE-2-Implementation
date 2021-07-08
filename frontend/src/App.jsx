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
import MyArticles from './article/myArticles';
import ErrorPageNotFound from './notFoundError/routeNotFound';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import { useObserver, useLocalStore } from 'mobx-react-lite'

function App() {

  const store = useLocalStore(()=> ({
    loggedIn : false
  }))

  return useObserver(()=>(
    <div className="App">
      <BrowserRouter>
        <Header store={store}/>
        <div className = "mt-3">
          <Switch>
            <Route exact path='/'>
              <Showroom store={store} categories={["all"]}/>
            </Route>
            {!store.loggedIn &&
              <Route exact path='/login'>
                <Login store={store}></Login>
              </Route>
            }
            {!store.loggedIn &&
              <Route exact path='/createAccount' component={SignUp}/>
            }
            {store.loggedIn &&
                <Route exact path='/userChat' component={Chat}/>
            }
            {store.loggedIn &&
                <Route exact path='/myArticles' component={MyArticles}/>
            }
            {store.loggedIn &&
                <Route exact path='/createArticle' component={CreateArticle}/>
            }
            <Route path='/404' component={ErrorPageNotFound}/>
            <Redirect to='/404'/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  ));
}

export default App;
