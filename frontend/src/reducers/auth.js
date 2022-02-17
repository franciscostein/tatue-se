/* eslint-disable import/no-anonymous-default-export */
import {
	SIGNIN_SUCCESS,
	SIGNIN_FAIL,
	RESET_PASSWORD_EMAIL_SUCCESS,
	RESET_PASSWORD_EMAIL_FAIL,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
} from '../actions/types';

const initialState = {
	isAuthenticated: false,
	emailSent: false,
	passwordChanged: false,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SIGNIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
			};
		case SIGNIN_FAIL:
			return {
				...state,
				error: true,
			};
		case RESET_PASSWORD_EMAIL_SUCCESS:
			return {
				...state,
				emailSent: true,
			};
		case RESET_PASSWORD_EMAIL_FAIL:
			return {
				...state,
				emailSent: false,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				passwordChanged: true,
				error: false,
			};
		case RESET_PASSWORD_FAIL:
			return {
				...state,
				passwordChanged: false,
				error: true,
			};
		default:
			return state;
	}
}
