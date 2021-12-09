/* eslint-disable import/no-anonymous-default-export */
import {
    FETCH_STUDIOS,
    FETCH_STUDIO
} from '../actions/types';

const initialState = {
    studios: [],
    studio: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_STUDIOS:
            return {
                ...state,
                studios: payload
            }
        case FETCH_STUDIO:
            return {
                ...state,
                studio: payload
            }
        default:
            return state;
    }
}