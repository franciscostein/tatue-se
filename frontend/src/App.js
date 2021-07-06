import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';
// import SignUp from "./components/signup/SignUp";
// import Profile from './components/profile/Profile';
// import Artist from './components/artist/Artist';
import Studio from './components/studio/Studio';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-header">
                <Container>
                    {/* <SignUp /> */}
                    {/* <Profile /> */}
                    {/* <Artist /> */}
                    <Studio />
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default App;