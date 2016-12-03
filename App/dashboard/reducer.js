import { combineReducers } from 'redux';
import * as types from './actionTypes';
import { createReducer, updateObject} from '../Utils/reducerLib';
import { getLayout} from '../Utils/helpers'

function layoutInfo(state = getLayout(), action) {
	switch (action.type) {
		case types.SET_LAYOUT: return updateObject(state, action.layoutInfo);
		default: return state
	}
}

function scrollEnabled(state = true, action) {
	switch (action.type) {
		case types.TOGGLE_SCROLL_ENABLED: return !state;
		default: return state
	}
}

function selectedTab(state = 'map', action) {
	switch (action.type) {
		case types.SET_SELECTED_ICON: return 'iconSearch';
		case types.SET_SELECTED_TAB: return action.tab;
		case types.ADD_PLACE:
		case types.SET_PLACE_INFO: return 'placeInfo';
		default: return state;
	}
}

export default combineReducers({
	layoutInfo,
	scrollEnabled,
	selectedTab
})