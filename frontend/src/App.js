import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';
import Studios from './components/studios/Studios';
import Studio from './components/studios/studio/Studio';
import StudioProfile from './components/studios/studioProfile/StudioProfile';
import Artists from './components/artists/Artists';
import Artist from './components/artists/artist/Artist';
import ArtistProfile from './components/artists/artistProfile/ArtistProfile';
import UserProfile from './components/userProfile/UserProfile';
import SignUp from './components/signup/SignUp';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-content">
                <Provider store={store}>
                    <BrowserRouter>
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
                            <Route path="/studios">
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
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
            <Footer />
        </div>
    );
}

export default App;