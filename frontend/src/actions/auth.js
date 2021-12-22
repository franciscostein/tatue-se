import axios from "axios";
import { setAuthToken } from "../utils/authToken"

import {
    RESET_PASSWORD_EMAIL_SUCCESS,
    RESET_PASSWORD_EMAIL_FAIL
} from './types';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
}

export const sendForgotPasswordEmail = email => async dispatch => {
    try {
        const { status, data } = await axios.post('api/auth/forgot-password', { email });

        if (status === 200) {
            dispatch({
                type: RESET_PASSWORD_EMAIL_SUCCESS,
                payload: data
            });
        } else {
            throw new Error();
        }
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_EMAIL_FAIL,
            payload: { msg: 'E-mail could not be sent. Please review your e-mail address and try again.' }
        })
    }
}