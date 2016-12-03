import { combineReducers } from 'redux';
import user from './user';
import dashboard from './dashboard';

export default combineReducers({
	user,
	dashboard
})


/*
for markers should keep them all as a object and then keep a second reducer to keep track of ids of those objects
myMarkersById
myMarkersIds
followingMarkersById
followingMarkersIds
*/