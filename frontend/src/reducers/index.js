import { combineReducers } from 'redux';
import artist from './artist';
import tattooStyles from './tattooStyles';
import user from './user';
import studio from './studio';
import auth from './auth';

export default combineReducers({
    artist,
    tattooStyles,
    user,
    studio,
    auth
});