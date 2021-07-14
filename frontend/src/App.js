import './App.css';
import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';
// import Studios from './components/studios/Studios';
// import Artists from './components/artists/Artists';
import Artist from './components/artists/artist/Artist';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="App-content">
                <Artist />
            </div>
            <Footer />
        </div>
    );
}

export default App;