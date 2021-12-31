/* eslint-disable import/no-anonymous-default-export */
import {
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    RESET_PASSWORD_EMAIL_SUCCESS,
    RESET_PASSWORD_EMAIL_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_STATE
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    emailSent: false,
    passwordChanged: false,
    error: false,
    message: '',
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
                message: payload.msg
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
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                passwordChanged: true,
                message: payload.msg
            }
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                passwordChanged: false,
                message: payload.msg,
                error: true
            }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}