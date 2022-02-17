/* eslint-disable import/no-anonymous-default-export */
import {
	SAVE_USER_SUCCESS,
	SAVE_USER_FAIL,
	SAVE_PICTURE_SUCCESS,
	FETCH_USER_INFO,
	FETCH_USER_PICTURE,
	USER_ERROR,
	USER_DELETED,
} from '../actions/types';

const initialState = {
	user: {
		email: '',
		profilePicture: {
			publicId: '',
		},
	},
	loading: true,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SAVE_USER_SUCCESS:
			return {
				...state,
				user: payload,
				loading: false,
				error: false,
			};
		case SAVE_USER_FAIL:
			return {
				...state,
				user: {},
				error: true,
			};
		case USER_DELETED:
			return {
				...state,
				user: {},
				error: false,
			};
		case SAVE_PICTURE_SUCCESS:
		case FETCH_USER_PICTURE:
			return {
				...state,
				user: payload,
				error: false,
			};
		case FETCH_USER_INFO:
			return {
				...state,
				user: payload,
				error: false,
			};
		case USER_ERROR:
			return {
				...state,
				error: true,
			};
		default:
			return state;
	}
}
