import * as types from './actionTypes'
import { combineReducers } from 'redux';
import api from '../Utils/api'

function id(state = '', action) {
	switch(action.type) {
		case types.SET_USER_INFO: return action.info.id;
		default: return state
	}
}

function lastUpdated(state = '', action) {
	switch(action.type) {
		case types.ADD_PLACE: return action.time;
		case types.SET_USER_INFO: return action.info.lastUpdated;
		default: return state
	}
}

function email(state = '', action) {
	switch(action.type) {
		case types.SET_USER_INFO: return action.info.email;
		default: return state
	}
}

export default combineReducers({
	email,
	id,
	lastUpdated
})