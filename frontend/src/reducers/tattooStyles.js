/* eslint-disable import/no-anonymous-default-export */
import {
	FETCH_TATTOO_STYLES_SUCCESS,
	FETCH_TATTOO_STYLES_FAIL,
} from '../actions/types';

const initialState = {
	tattooStyles: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_TATTOO_STYLES_SUCCESS:
			return {
				...state,
				tattooStyles: payload,
				loading: false,
			};
		case FETCH_TATTOO_STYLES_FAIL:
			return {
				...state,
				error: payload,
				loading: false,
				tattooStyles: [],
			};
		default:
			return state;
	}
}
