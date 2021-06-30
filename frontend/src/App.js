import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from "./components/navbar/Navbar";
import SignUp from "./components/signup/SignUp";

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-header">
                <Container>
                    <SignUp />
                </Container>
            </div>
        </div>
    );
}

export default App;