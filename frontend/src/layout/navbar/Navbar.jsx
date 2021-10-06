import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { FaBars } from 'react-icons/fa';
import userSolid from '../../assets/user_w.png';

const NavbarComponent = () => {
    const pathname = window.location.pathname;
    
    return (
        <Navbar bg="dark" expand="lg" sticky="top">
            <Navbar.Brand className="px-3 text-white">tatue-se</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav.Link className={pathname === '/' && 'selected-link'} href="/">Artists</Nav.Link>
                <Nav.Link className={pathname === '/studios' && 'selected-link'} href="/studios">Studios</Nav.Link>
            </Navbar.Collapse>

            <Dropdown className="px-4">
                <Dropdown.Toggle variant="dark" id="dropdown-profile">
                    <Image src={userSolid} className="min-user px-3" roundedCircle />
                    <FaBars size={27} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item className="dropdown-item text-white">Profile</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item text-white">Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    );
}

export default NavbarComponent;