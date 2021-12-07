/* eslint-disable import/no-anonymous-default-export */
import {
    FETCH_STUDIOS
} from '../actions/types';

const initialState = {
    studios: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_STUDIOS:
            return {
                ...state,
                studios: payload
            }
        default:
            return state;
    }
}