/* eslint-disable import/no-anonymous-default-export */
import {
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    RESET_PASSWORD_EMAIL_SUCCESS,
    RESET_PASSWORD_EMAIL_FAIL
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    emailSent: false,
    message: '',
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
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
        case RESET_PASSWORD_EMAIL_SUCCESS:
            return {
                ...state,
                emailSent: true,
                message: payload.msg
            }
        case RESET_PASSWORD_EMAIL_FAIL:
            return {
                ...state,
                emailSent: false,
                message: payload.msg
            }
        default:
            return state;
    }
}