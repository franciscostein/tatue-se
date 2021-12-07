/* eslint-disable import/no-anonymous-default-export */
import {
    FETCH_ARTISTS,
    FETCH_ARTISTS_ERROR,
    GET_ARTIST_PROFILE,
    SAVE_ARTIST_PROFILE,
    ARTIST_PROFILE_ERROR
} from '../actions/types';

const initialState = {
    artists: [],
    profile: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_ARTISTS:
            return {
                ...state,
                artists: payload
            }
        case GET_ARTIST_PROFILE:
        case SAVE_ARTIST_PROFILE:
            return {
                ...state,
				profile: payload,
                loading: false
            }
        case ARTIST_PROFILE_ERROR:
        case FETCH_ARTISTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        default:
            return state;
    }
}