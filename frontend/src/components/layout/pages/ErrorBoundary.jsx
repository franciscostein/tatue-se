import { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<Fragment>
					<h1>Sorry, there was an error</h1>
					<h2>=(</h2>
				</Fragment>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
