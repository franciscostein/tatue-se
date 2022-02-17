import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './utils/authToken';
import { loadUser } from './actions/auth';

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Routes from './routes/Routes';

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
                        <Routes />
                    </div>
                    <Footer />
                </Provider>
            </Router>
        </div>
    );
}

export default App;