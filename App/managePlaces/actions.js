import * as types from './actionTypes'

export function addPlace(place, time) {
	return {
		type: types.ADD_PLACE,
		place,
		time
	}
}

export function updatePlace(place, time) {
	return {
		type: types.UPDATE_PLACE,
		place,
		time
	}
}