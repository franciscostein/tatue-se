import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (message, variant) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { message, variant }
    });
}

export const setAlertTimeout = (message, variant, timeout = 3000) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { message, variant }
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
    }), timeout);
}

export const removeAlert = () => dispatch => {
    dispatch({
        type: REMOVE_ALERT
    });
}