import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from "./components/navbar/Navbar";
// import SignUp from "./components/signup/SignUp";
import Profile from './components/profile/Profile';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-header">
                <Container>
                    {/* <SignUp /> */}
                    <Profile />
                </Container>
            </div>
        </div>
    );
}

export default App;