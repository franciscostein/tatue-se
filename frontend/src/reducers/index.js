import { combineReducers } from 'redux';

import alert from './alert';
import artist from './artist';
import auth from './auth';
import studio from './studio';
import tattooStyles from './tattooStyles';
import user from './user';

export default combineReducers({
	alert,
	artist,
	auth,
	studio,
	tattooStyles,
	user,
});
