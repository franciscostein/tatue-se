/* eslint-disable import/no-anonymous-default-export */
import {
	FETCH_ARTISTS,
	FETCH_ARTIST,
	FETCH_ARTIST_PROFILE,
	SAVE_ARTIST_PROFILE,
	SAVE_ARTIST_IMAGE,
	SAVE_ARTIST_COVER,
	SAVE_ARTIST_PORTFOLIO,
	DELETE_ARTIST,
	ARTIST_ERROR,
	LOADING,
} from '../actions/types';

const initialState = {
	artists: [],
	artist: null,
	profile: null,
	loading: false,
	error: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_ARTISTS:
			return {
				...state,
				artists: payload,
			};
		case FETCH_ARTIST:
			return {
				...state,
				artist: payload,
			};
		case FETCH_ARTIST_PROFILE:
		case SAVE_ARTIST_PROFILE:
		case DELETE_ARTIST:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case SAVE_ARTIST_IMAGE:
			return {
				...state,
				profile: {
					profilePicture: payload,
				},
			};
		case SAVE_ARTIST_COVER:
			return {
				...state,
				profile: {
					cover: payload,
				},
			};
		case SAVE_ARTIST_PORTFOLIO:
			return {
				...state,
				profile: {
					portfolio: payload,
				},
				error: false,
				loading: false,
			};
		case ARTIST_ERROR:
			return {
				...state,
				error: true,
				loading: false,
			};
		case LOADING:
			return {
				...state,
				error: false,
				loading: true,
			};
		default:
			return state;
	}
}
