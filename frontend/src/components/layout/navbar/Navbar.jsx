import './Navbar.css';
import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { setAuthToken } from '../../../utils/authToken';
import { fetchUserInfo } from '../../../actions/user';
import { removeAlert } from '../../../actions/alert';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import {
	FaBars,
	FaUserAlt,
	FaPaintBrush,
	FaAnchor,
	FaSignOutAlt,
	FaSignInAlt,
	FaUserPlus,
} from 'react-icons/fa';

import userSolid from '../../../assets/user_w.png';

const NavbarComponent = ({
	user: {
		user: { email, profilePicture },
	},
	fetchUserInfo,
	removeAlert,
	history,
}) => {
	const pathname = window.location.pathname;

	useEffect(() => {
		if (!email) {
			fetchUserInfo();
		}
	}, [fetchUserInfo, email, profilePicture]);

	const artistsClickHandler = () => {
		history.push('/');
	};

	const logoutHandler = () => {
		setAuthToken();
		window.location.reload();
	};

	const clearAlertStateAndGoTo = route => {
		removeAlert();
		history.push(route);
	};

	return (
		<Navbar bg="dark" expand="lg" sticky="top">
			<Navbar.Brand className="px-3 text-white">tatue-se</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbar-nav" />
			<Navbar.Collapse id="navbar-nav">
				<Nav.Link
					className={pathname === '/' && 'selected-link'}
					onClick={artistsClickHandler}
				>
					Artists
				</Nav.Link>
				<Nav.Link
					className={pathname === '/studios' && 'selected-link'}
					onClick={() => history.push('/studios')}
				>
					Studios
				</Nav.Link>
			</Navbar.Collapse>

			<Dropdown className="px-4">
				<Dropdown.Toggle variant="dark" id="dropdown-profile">
					<Image
						src={
							(profilePicture && profilePicture.publicId) ||
							userSolid
						}
						className="min-user px-3"
						roundedCircle
					/>
					<FaBars size={25} />
				</Dropdown.Toggle>

				<Dropdown.Menu className="dropdown-menu">
					{email ? (
						<Fragment>
							<Dropdown.Item
								className="dropdown-item text-white"
								onClick={() =>
									clearAlertStateAndGoTo('/user/profile')
								}
							>
								<FaUserAlt className="me-2" /> User
							</Dropdown.Item>
							<Dropdown.Item
								className="dropdown-item text-white"
								onClick={() =>
									clearAlertStateAndGoTo('/artists/profile')
								}
							>
								<FaPaintBrush className="me-2" /> Artist
							</Dropdown.Item>
							<Dropdown.Item
								className="dropdown-item text-white"
								onClick={() =>
									clearAlertStateAndGoTo('/studios/profile')
								}
							>
								<FaAnchor className="me-2" /> Studio
							</Dropdown.Item>
							<Dropdown.Item
								className="dropdown-item text-white"
								onClick={logoutHandler}
							>
								<FaSignOutAlt className="me-2" /> Log out
							</Dropdown.Item>
						</Fragment>
					) : (
						<Fragment>
							<Dropdown.Item
								className="dropdown-item text-white"
								onClick={() =>
									clearAlertStateAndGoTo('/signin')
								}
							>
								<FaSignInAlt className="me-2" /> Sign in
							</Dropdown.Item>
							<Dropdown.Item
								className="dropdown-item text-white"
								onClick={() =>
									clearAlertStateAndGoTo('/signup')
								}
							>
								<FaUserPlus className="me-2" /> Sign up
							</Dropdown.Item>
						</Fragment>
					)}
				</Dropdown.Menu>
			</Dropdown>
		</Navbar>
	);
};

const mapStateToProps = state => ({
	user: state.user,
});

export default connect(mapStateToProps, {
	fetchUserInfo,
	removeAlert,
})(withRouter(NavbarComponent));
