/* eslint-disable import/no-anonymous-default-export */
import {
    GET_ARTIST_PROFILE,
    SAVE_ARTIST_PROFILE,
    ARTIST_PROFILE_ERROR
} from '../actions/types';

const initialState = {
    profile: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ARTIST_PROFILE:
        case SAVE_ARTIST_PROFILE:
            return {
                ...state,
				profile: payload,
                loading: false
            }
        case ARTIST_PROFILE_ERROR:
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