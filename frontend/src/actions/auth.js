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

    // try {
    //     const res = await axios.post('/api/auth');
    // } catch (err) {
        
    // }
}

export const sendForgotPasswordEmail = email => async dispatch => {
    try {
        const response = await axios.post('api/auth/forgot-password', { email });

        console.log('sendForgotPasswordEmail', response);

        if (response.data) {
            if (response.status === 204) {
                dispatch({
                    type: RESET_PASSWORD_EMAIL_FAIL,
                    payload: response.data
                })
            } else {
                dispatch({
                    type: RESET_PASSWORD_EMAIL_SUCCESS,
                    payload: response.data
                });
            }
        }
    } catch (error) {
        console.error(error.message);
        dispatch({
            type: RESET_PASSWORD_EMAIL_FAIL,
            payload: { msg: 'E-mail could not be sent. Please review your e-mail address and try again.' }
        })
    }
}