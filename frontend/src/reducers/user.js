/* eslint-disable import/no-anonymous-default-export */
import {
    SAVE_USER,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    FETCH_USER_INFO,
} from '../actions/types';

const initialState = {
    user: null,
    userInfo: null,
    isAuthenticated: false,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_USER:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case SIGNIN_FAIL:
            return {
                ...state,
                error: {
                    msg: 'E-mail or password incorrect.'
                }
            }
        case FETCH_USER_INFO:
            return {
                ...state,
                userInfo: payload,
                error: null
            }            
        default:
            return state;
    }
}