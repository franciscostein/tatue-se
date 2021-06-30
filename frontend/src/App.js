import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from "./components/navbar/Navbar";
// import SignUp from "./components/signup/SignUp";
// import Profile from './components/profile/Profile';
import Artist from './components/artist/Artist';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-header">
                <Container>
                    {/* <SignUp /> */}
                    {/* <Profile /> */}
                    <Artist />
                </Container>
            </div>
        </div>
    );
}

export default App;