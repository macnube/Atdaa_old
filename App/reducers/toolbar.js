import * as types from '../actions/types';
import Icons from '../Components/Resources/Icons'

const initialToolbarIds = [5, 4, 6, 0, 1]
const initialToolbar = getToolbarFromIds(initialToolbarIds)


/*
TO DO LIST
can creater helper functions with names get... to indicate that it prepares the data to be used by the UI
these can be named exports so that they can be used from the view layer.
Theses are called selectors
*/

//HELPERS
function getToolbarFromIds(toolbarIds) {
	return toolbarIds.map( (id, index) => getIcon(id, index) )
}

function getIcon(id, index) {
	return {
		...Icons[id],
		priority: index
	}
}

function sortToolbarByPriority(toolbar) {
	return toolbar.sort( (a,b) => {
		if (a.priority < b.priority) {
			return -1
		} else {
			return 1
		}
	})
}


//REDUCERS

function updateToolbarIcon(toolbar, id, index) {
	return toolbar.map( (icon, i) => {
		if (i !== index) {
			return icon
		} else {
			return getIcon(id, index)
		}
	})
}

function deleteToolbarIcon(toolbar, index) {
	return updateToolbarIcon(toolbar, 0, index);
}

function switchToolbarIcons(toolbar, indexOne, indexTwo) {
	return sortToolbarByPriority(toolbar.map( (icon, index) => {
		if (index === indexOne) {
			icon.priority = indexTwo;
		}
		else if (index === indexTwo) {
			icon.priority = indexOne;
		}
		return icon
	}))
}

function toggleTrash(toolbar) {
	if (toolbar[4].name === "trash") {
		console.log("Trash is on!");
		return updateToolbarIcon(toolbar, 1, 4)
	}
	else return updateToolbarIcon(toolbar, 2, 4);
}


export default function toolbar(state = initialToolbar, action) {
	switch (action.type) {
		case types.DELETE_TOOLBAR_ICON: return deleteToolbarIcon(state, action.index);
		case types.UPDATE_TOOLBAR_ICON: return updateToolbarIcon(state, action.iconId, action.index);
		case types.SWITCH_TOOLBAR_ICONS: return switchToolbarIcons(state, action.indexOne, action.indexTwo);
		default: return state
	}
}



