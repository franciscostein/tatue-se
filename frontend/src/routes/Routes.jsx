import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Studios from '../components/studios/Studios';
import Studio from '../components/studios/studio/Studio';
import StudioProfile from '../components/studios/studioProfile/StudioProfile';
import Artists from '../components/artists/Artists';
import Artist from '../components/artists/artist/Artist';
import ArtistProfile from '../components/artists/artistProfile/ArtistProfile';
import UserProfile from '../components/userProfile/UserProfile';
import SignUp from '../components/login/SignUp';
import SignIn from '../components/login/SignIn';
import ResetPassword from '../components/resetPassword/ResetPassword';
import ForgotPassword from '../components/resetPassword/ForgotPassword';
import NotFound from '../components/layout/pages/NotFound';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Artists />
			</Route>
			<PrivateRoute exact path="/artists/profile">
				<ArtistProfile />
			</PrivateRoute>
			<Route path="/artists/:id">
				<Artist />
			</Route>
			<Route exact path="/studios">
				<Studios />
			</Route>
			<PrivateRoute exact path="/studios/profile">
				<StudioProfile />
			</PrivateRoute>
			<Route path="/studios/:id">
				<Studio />
			</Route>
			<PrivateRoute path="/user/profile">
				<UserProfile />
			</PrivateRoute>
			<Route path="/signup">
				<SignUp />
			</Route>
			<Route path="/signin">
				<SignIn />
			</Route>
			<Route path="/reset-password/:id/:token">
				<ResetPassword />
			</Route>
			<Route path="/forgot-password">
				<ForgotPassword />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
};

export default Routes;
