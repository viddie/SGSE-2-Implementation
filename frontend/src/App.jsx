import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header/header";
import React from 'react';
import { uid } from 'uid';
import Showroom from './article/showroom';
import Chat from './chat/chat';
import Login from './user/login';
import SignUp from './user/signUp';
import Ratings from './ratings/ratings';
import CreateArticle from './article/createArticle';
import ErrorPageNotFound from './notFoundError/routeNotFound';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import { useObserver, useLocalStore } from 'mobx-react-lite'

function App() {
  window.location.reload(false);
  
  const store = useLocalStore(()=> ({
    loggedIn : false
  }))

  return useObserver(()=>(
    <div>hallo</div>
  ));
}

export default App;
