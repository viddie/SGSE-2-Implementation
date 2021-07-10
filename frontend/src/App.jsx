import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header/header';
import React from 'react';
import { uid } from 'uid';
import Showroom from './article/showroom';
import Chat from './chat/chat';
import ChatSelection from './chat/chatSelection';
import Login from './user/login';
import SignUp from './user/signUp';
import { FoundArticles } from './search/search';
import { MakeRating } from './ratings/ratings';
import { CreateArticle, EditArticle } from './article/manageArticle';
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
                        <Route exact path="/search-:query">
                            <FoundArticles store={store}></FoundArticles>
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
                            <Route exact path="/chatSelection" component={ChatSelection} />
                        )}
                        {store.loggedIn && (
                            <Route exact path="/userChat-:name:id" component={Chat} />
                        )}
                        {!store.loggedIn && (
                            <Route
                                exact
                                path="/rating"
                                component={MakeRating}
                            />
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
                        {store.loggedIn && (
                            <Route
                                exact
                                path="/editArticle-:id"
                                component={EditArticle}
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
