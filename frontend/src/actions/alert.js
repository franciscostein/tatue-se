import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (message, variant = 'success') => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { message, variant }
    });
}

export const setAlertTimeout = (message, variant = 'success', timeout = 3000) => dispatch => {
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