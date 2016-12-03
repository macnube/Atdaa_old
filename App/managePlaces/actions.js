import * as types from './actionTypes'

export function addPlace(place) {
	return {
		type: types.ADD_PLACE,
		place
	}
}

export function updatePlace(place) {
	return {
		type: types.UPDATE_PLACE,
		place
	}
}