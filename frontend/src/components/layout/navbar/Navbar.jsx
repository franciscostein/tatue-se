import './Navbar.css';
import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { setAuthToken } from '../../../utils/authToken';
import { fetchUserInfo } from '../../../actions/user';
import { resetAuthState } from '../../../actions/auth';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { FaBars, FaUserAlt, FaPaintBrush, FaAnchor, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import userSolid from '../../../assets/user_w.png';

const NavbarComponent = ({ user: { userInfo }, fetchUserInfo, resetAuthState, history }) => {
    const pathname = window.location.pathname;
    const [profile, setProfile] = useState({
        userPicture: null,
        artistProfileId: '',
        studioProfileId: ''
    });

    useEffect(() => {
        if (userInfo) {
            setProfile({
                userPicture: !userInfo.artistProfilePicture ? '' : userInfo.artistProfilePicture.publicId,
                artistProfileId: userInfo.artistProfileId ?? null,
                studioProfileId: userInfo.studioProfileId ?? null
            });
        } else {
            setProfile({
                userPicture: null,
                artistProfileId: '',
                studioProfileId: ''
            });

            fetchUserInfo();
        }
    }, [fetchUserInfo, userInfo]);

    const handleLogout = () => {
        setAuthToken('');
        window.location.reload();
    }

    const resetStateAndGoTo = route => {
        resetAuthState();
        history.push(route);
    }
    
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
                    <Image src={profile.userPicture ?? userSolid} className="min-user px-3" roundedCircle />
                    <FaBars size={25} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                    {
                        userInfo ? (
                            <Fragment>
                                <Dropdown.Item className="dropdown-item text-white" onClick={() => history.push('/user/profile')}>
                                    <FaUserAlt className="me-2" /> User
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item text-white" onClick={() => history.push('/artists/profile')}>
                                    <FaPaintBrush className="me-2" /> Artist
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item text-white" onClick={() => history.push('/studios/profile')}>
                                    <FaAnchor className="me-2" /> Studio
                                </Dropdown.Item>
                                <Dropdown.Item className="dropdown-item text-white" onClick={handleLogout}>
                                    <FaSignOutAlt className="me-2" /> Log out
                                </Dropdown.Item>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Dropdown.Item className="dropdown-item text-white" onClick={() => resetStateAndGoTo('/signin')}><FaSignInAlt className="me-2" /> Sign in</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item text-white" onClick={() => resetStateAndGoTo('/signup')}><FaUserPlus className="me-2" /> Sign up</Dropdown.Item>
                            </Fragment>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    );
}

NavbarComponent.propTypes = {
    userInfo: PropTypes.object.isRequired,
    fetchUserInfo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { fetchUserInfo, resetAuthState })(withRouter(NavbarComponent));