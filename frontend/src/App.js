import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';
// import Studios from './components/studios/Studios';
import Artists from './components/artists/Artists';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-header">
                <Container>
                    <Artists />
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default App;