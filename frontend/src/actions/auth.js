import axios from "axios";
import { setAuthToken } from "../utils/authToken"

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.post('/api/auth');
    } catch (err) {
        
    }
}