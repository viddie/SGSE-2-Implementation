import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header/header';
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
import { useObserver, useLocalStore } from 'mobx-react-lite';

function App() {
    const store = useLocalStore(() => ({
        loggedIn: false
    }));

    return useObserver(() => (
        <div className="App">
            <BrowserRouter>
                <Header store={store} />
                <div className="mt-3">
                    <Switch>
                        <Route exact path="/">
                            <Showroom
                                key={uid()}
                                store={store}
                                path={
                                    '/api/offers/article/findByCategory?categories=all'
                                }
                            />
                        </Route>
                        {!store.loggedIn && (
                            <Route exact path="/login">
                                <Login store={store}></Login>
                            </Route>
                        )}
                        {!store.loggedIn && (
                            <Route
                                exact
                                path="/createAccount"
                                component={SignUp}
                            />
                        )}
                        {store.loggedIn && (
                            <Route exact path="/userChat" component={Chat} />
                        )}
                        {!store.loggedIn && (
                            <Route exact path="/rating" component={Ratings} />
                        )}
                        {store.loggedIn && (
                            <Route exact path="/myArticles">
                                <Showroom
                                    key={uid()}
                                    store={store}
                                    path={
                                        '/api/offers/article/findByUser?users=' +
                                        sessionStorage.getItem('userID')
                                    }
                                />
                            </Route>
                        )}
                        {store.loggedIn && (
                            <Route
                                exact
                                path="/createArticle"
                                component={CreateArticle}
                            />
                        )}
                        <Route path="/404" component={ErrorPageNotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    ));
}

export default App;
