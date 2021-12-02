/* eslint-disable import/no-anonymous-default-export */
import {
    SAVE_USER,
    AUTHENTICATE_USER,
    FETCH_USER_INFO
} from '../actions/types';

const initialState = {
    user: null,
    userInfo: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_USER:
        case AUTHENTICATE_USER:
            return {
                ...state,
                user: payload,
                loading: false
            }  
        case FETCH_USER_INFO:
            return {
                ...state,
                userInfo: payload,
            }            
        default:
            return state;
    }
}