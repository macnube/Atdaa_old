import * as types from './actionTypes';

export function setLayout(layoutInfo){
	return {
		type: types.SET_LAYOUT,
		layoutInfo
	}
}

export function setSelectedTab(tab) {
	return {
		type: types.SET_SELECTED_TAB,
		tab
	}
}

export function loadLocalInfo(userInfo) {
	return {
		type: types.LOAD_LOCAL_INFO,
		userInfo
	}
}