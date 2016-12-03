import * as types from './actionTypes';

export function setSearchMarker(marker) {
	return {
		type: types.SET_SEARCH_MARKER,
		marker
	}
}