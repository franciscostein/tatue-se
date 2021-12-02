/* eslint-disable import/no-anonymous-default-export */
import {
    SAVE_USER,
    AUTHENTICATE_USER,
    FETCH_USER_INFO
} from '../actions/types';

const initialState = {
    user: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_USER:
        case AUTHENTICATE_USER:
        case FETCH_USER_INFO:
            return {
                ...state,
                user: payload,
                loading: false
            }            
        default:
            return state;
    }
}