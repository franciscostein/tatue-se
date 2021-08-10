import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { FaBars } from 'react-icons/fa';
import userSolid from '../../assets/user_w.png';

// Font awesome pixel sizes relative to the multiplier. 
// 1x - 14px
// 2x - 28px
// 3x - 42px
// 4x - 56px
// 5x - 70px

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" expand="lg" sticky="top">
            <Navbar.Brand className="px-3 text-white">tatue-se</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav.Link>Artists</Nav.Link>
                <Nav.Link>Studios</Nav.Link>
            </Navbar.Collapse>

            <Dropdown className="px-4">
                <Dropdown.Toggle variant="dark" id="dropdown-profile">
                    <Image src={userSolid} className="min-user px-3" roundedCircle />
                    <FaBars size={28} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item className="text-white">Profile</Dropdown.Item>
                    <Dropdown.Item className="text-white">Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    );
}

export default NavbarComponent;