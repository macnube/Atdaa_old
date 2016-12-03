import * as types from './actionTypes';

export default function searchMarker(state = {}, action) {
	switch(action.type) {
		case types.SET_SEARCH_MARKER: return action.state
		default: state
	}
}