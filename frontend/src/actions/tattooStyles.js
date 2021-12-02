import axios from 'axios';

import {
    GET_TATTOO_STYLES,
    TATTOO_STYLES_ERROR
} from './types';

export const fetchTattooStyles = () => async dispatch => {
    try {
        const res = await axios.get('/api/tattoo-styles');

        dispatch({
            type: GET_TATTOO_STYLES,
            payload: res.data
        });
    } catch (error) {
        // dispatch({
        //     type: TATTOO_STYLES_ERROR,
        //     payload: { 
        //         msg: error.response.statusText, 
        //         status: error.response.status
        //     }
        // });
        console.error(error);
    }
}