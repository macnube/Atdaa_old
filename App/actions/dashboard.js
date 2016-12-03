import * as types from './types';


//navbar related

export function setSelectedTab(tab) {
	return {
		type: types.SET_SELECTED_TAB,
		tab
	}
}

//toolbar related
export function updateToolbarIcon(iconId, index) {
	return {
		type: types.UPDATE_TOOLBAR_ICON,
		iconId,
		index
	}
}

export function toggleTrash() {
	return {
		type: types.TOGGLE_TRASH
	}
}

export function deleteToolbarIcon(index) {
	return {
		type: types.DELETE_TOOLBAR_ICON,
		index
	}
}

export function switchToolbarIcons(indexOne, indexTwo) {
	return {
		type: types.SWITCH_TOOLBAR_ICONS,
		indexOne,
		indexTwo
	}
}

//Search Button

export function togglePlus() {
	return {
		type: types.TOGGLE_PLUS
	}
}


//NEW ICON
export function clearNewIcon() {
	return {
		type: types.CLEAR_NEW_ICON
	}
}

export function setNewIcon(icon) {
	return {
		type: types.SET_NEW_ICON,
		icon
	}
}



//SEARCH MARKER
export function setSearchMarker(marker) {
	return {
		type: types.SET_SEARCH_MARKER,
		marker
	}
}

//Layout Related

export function toggleScrollEnabled() {
	return {
		type: types.TOGGLE_SCROLL_ENABLED
	}
}

export function setLayout(layoutInfo){
	return {
		type: types.SET_LAYOUT,
		layoutInfo
	}
}