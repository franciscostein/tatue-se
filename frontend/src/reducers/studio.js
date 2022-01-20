/* eslint-disable import/no-anonymous-default-export */
import {
    FETCH_STUDIOS,
    FETCH_STUDIO,
    SAVE_STUDIO_SUCCESS,
    SAVE_STUDIO_FAIL
} from '../actions/types';

const initialState = {
    studios: [],
    studio: null,
    error: false
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_STUDIOS:
            return {
                ...state,
                studios: payload,
                error: false
            }
        case FETCH_STUDIO:
        case SAVE_STUDIO_SUCCESS:
            return {
                ...state,
                studio: payload,
                error: false
            }
        case SAVE_STUDIO_FAIL:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}