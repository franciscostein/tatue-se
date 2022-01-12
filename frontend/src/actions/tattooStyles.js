import axios from 'axios';

import {
    FETCH_TATTOO_STYLES_SUCCESS,
    FETCH_TATTOO_STYLES_FAIL
} from './types';

export const fetchTattooStyles = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/tattoo-styles');

        dispatch({
            type: FETCH_TATTOO_STYLES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FETCH_TATTOO_STYLES_FAIL,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        });
    }
}