import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
	user: {
		user: { email },
	},
	exact,
	path,
	children,
}) => {
	return (
		<Route exact={exact} path={path}>
			{email ? children : <Redirect to={{ pathname: '/' }} />}
		</Route>
	);
};

const mapStateToProps = state => ({
	user: state.user,
});

export default connect(mapStateToProps, {})(PrivateRoute);
