/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
	message: '',
	variant: '',
	showAlert: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return {
				...state,
				message: payload.message,
				variant: payload.variant,
				showAlert: true,
			};
		case REMOVE_ALERT:
			return initialState;
		default:
			return state;
	}
}
