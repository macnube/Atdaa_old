import * as types from './actionTypes';
import { combineReducers } from 'redux';
import { updateObject } from '../Utils/reducerLib'

const createPlace = (place) => {
	return {
		[place.place_id]: place
	}
}

const getPlaceId = (place) => {
	return place.place_id
}

const getCurrent = () => {
	return new Date().getTime() / 1000
}

const updatePlaceIds = (state, placeId) => {
	if (state.indexOf(placeId) === -1) {
		return state.concat([placeId])
	} else return state
}

function readLocalPlaces(state, userInfo) {
	if (userInfo.myPlaces) {
		return updateObject(state, userInfo.myPlaces.myPlacesById);
	} else return state
}

function readLocalPlaceIds(state, userInfo) {
	if (userInfo.myPlaces) {
		return state.concat(userInfo.myPlaces.placeIds);
	} else return state
}

function readLocalLastUpdated(state, userInfo) {
	if (userInfo.myPlaces) {
		return userInfo.myPlaces.lastUpdated
	} else return state
}

function updatePlace(state, place) {
	return {...state, [place.place_id]: place}
}



export function myPlacesById(state = {}, action) {
	switch (action.type) {
		case types.UPDATE_PLACE: return updatePlace(state, action.place);
		case types.LOAD_LOCAL_INFO: return readLocalPlaces(state, action.userInfo);
		case types.ADD_PLACE: return updateObject(state, createPlace(action.place))
		default: return state;
	}
}

export function placeIds(state = [], action) {
	switch (action.type) {
		case types.LOAD_LOCAL_INFO: return readLocalPlaceIds(state, action.userInfo);
		case types.ADD_PLACE: return updatePlaceIds(state, getPlaceId(action.place));
		default: return state;
	}
}

export function lastUpdated(state = null, action) {
	switch (action.type) {
		case types.LOAD_LOCAL_INFO: return readLocalLastUpdated(state, action.userInfo);
		case types.ADD_PLACE: return getCurrent();
		default: return state;
	}
}

export default combineReducers({
	myPlacesById,
	placeIds,
	lastUpdated
})
