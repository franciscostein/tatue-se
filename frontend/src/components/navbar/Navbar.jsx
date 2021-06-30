import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand className="px-3 text-white">tatue-se</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav.Link>Artists</Nav.Link>
                <Nav.Link>Studios</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarComponent;