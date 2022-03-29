import axios from 'axios';

export const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

		if (localStorage.token !== token) {
			localStorage.token = token;
		}
	} else {
		delete axios.defaults.headers.common['Authorization'];
		localStorage.token = '';
		localStorage.removeItem('token');
	}
};
