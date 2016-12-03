import { createReducer, updateObject} from '../Utils/reducerLib';
import * as types from '../actions/types';

/*
export const user = createReducer({}, {
	[types.SET_USER_ID](state, action){
		return {
			...state,
			userId: action.userId
		}
	},
	[types.SET_USER_EMAIL](state, action){
		return {
			...state,
			userEmail: action.userEmail
		}
	},
	[types.SET_USER_PASS](state, action){
		return {
			...state,
			userPass: action.userPass
		}
	},
	
})
*/

function setUserInfo(state, action) {
	return updateObject(state, {userId: action.userId, email: action.email})
}

function setUserEmail(state, action) {
	return updateObject(state, {userId: action.email})
}

function setUserPass(state, action) {
	return updateObject(state, {userId: action.pass})
}

export default function user(state = {}, action) {
	switch(action.type){
		case types.SET_USER_INFO: return setUserInfo(state, action)
		case types.SET_USER_EMAIL: return setUserEmail(state, action);
		case types.SET_USER_PASS: return setUserPass(state, action);
		default: return state
	}
}