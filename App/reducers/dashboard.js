import { combineReducers } from 'redux';
import { createReducer, updateObject} from '../Utils/reducerLib';
import toolbar from './toolbar';
import * as types from '../actions/types';
import helpers from '../Utils/helpers';

//Trash
function showingTrash(state = false, action) {
	switch(action.type) {
		case types.SWITCH_TOOLBAR_ICONS:
		case types.TOGGLE_TRASH: return !state;
		default: return state;
	}
}


//Search Marker
function searchMarker(state = {}, action) {
	switch (action.type) {
		case types.SET_SEARCH_MARKER: return updateObject(state, action.marker)
		default: return state
	}
}

//Plus 

function plusOpen(state = false, action) {
	switch (action.type) {
		case types.SET_SELECTED_TAB:
		case types.TOGGLE_PLUS: return !state;
		default: return state
	}
}


//New Icon

function newIcon(state = null, action) {
	switch (action.type) {
		case types.UPDATE_TOOLBAR_ICON:
		case types.CLEAR_NEW_ICON: return null
		case types.SET_NEW_ICON: return action.icon
		default: return state
	}
}

function selectedTab(state = 'map', action) {
	switch (action.type) {
		case types.SET_SELECTED_TAB: return action.tab;
		default: return state;
	}
}

function layoutInfo(state = helpers.getLayout(), action) {
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

export default combineReducers({
	toolbar,
	searchMarker,
	showingTrash,
	newIcon, 
	selectedTab,
	layoutInfo,
	scrollEnabled,
	plusOpen
})