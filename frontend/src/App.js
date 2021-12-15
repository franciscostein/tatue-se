import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './utils/authToken';
import { loadUser } from './actions/auth';

import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';
import Studios from './components/studios/Studios';
import Studio from './components/studios/studio/Studio';
import StudioProfile from './components/studios/studioProfile/StudioProfile';
import Artists from './components/artists/Artists';
import Artist from './components/artists/artist/Artist';
import ArtistProfile from './components/artists/artistProfile/ArtistProfile';
import UserProfile from './components/userProfile/UserProfile';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import ResetPassword from './components/resetPassword/ResetPassword';
import ForgotPassword from './components/resetPassword/ForgotPassword';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <div className="App">
            <Router>
                <Provider store={store}>
                    <Navbar />
                    <div className="App-content">
                        <Switch>
                            <Route exact path="/">
                                <Artists />
                            </Route>
                            <Route exact path="/artists/profile">
                                <ArtistProfile />
                            </Route>
                            <Route path="/artists/:id">
                                <Artist />
                            </Route>
                            <Route exact path="/studios">
                                <Studios />
                            </Route>
                            <Route exact path="/studios/profile">
                                <StudioProfile />
                            </Route>
                            <Route path="/studios/:id">
                                <Studio />
                            </Route>
                            <Route path="/user/profile">
                                <UserProfile />
                            </Route>
                            <Route path="/signup">
                                <SignUp />
                            </Route>
                            <Route path="/signin">
                                <SignIn />
                            </Route>
                            <Route path="/reset-password">
                                <ResetPassword />
                            </Route>
                            <Route path="/forgot-password">
                                <ForgotPassword />
                            </Route>
                        </Switch>
                    </div>
                    <Footer />
                </Provider>
            </Router>
        </div>
    );
}

export default App;