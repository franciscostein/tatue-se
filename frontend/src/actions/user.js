import axios from 'axios';

import {
    SAVE_USER
} from './types';

export const saveUser = (userData, history) => async dispatch => {
    try {
        const res = await axios.post('/api/users', userData);

        dispatch({
            type: SAVE_USER,
            payload: res.data
        });

        history.push('/');
    } catch (err) {
        console.log(err);
    }
}