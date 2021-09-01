import './App.css';
import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';
// import Studio from './components/studios/studio/Studio';
import Studios from './components/studios/Studios';
// import Artists from './components/artists/Artists';
// import Artist from './components/artists/artist/Artist';
// import ArtistProfile from './components/artists/artistProfile/ArtistProfile';
// import Profile from './components/profile/Profile';
// import SignUp from './components/signup/SignUp';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-content">
                {/* <Artists /> */}
                {/* <Artist /> */}
                {/* <ArtistProfile /> */}
                {/* <Profile /> */}
                {/* <SignUp /> */}
                {/* <Studio /> */}
                <Studios />
            </div>
            <Footer />
        </div>
    );
}

export default App;