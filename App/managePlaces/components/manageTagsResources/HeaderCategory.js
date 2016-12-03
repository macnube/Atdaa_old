import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
} from 'react-native'

import ManageTagsNavBar from './ManageTagsNavBar'

const HeaderCategory = ({ categoryIcon, layoutInfo, onBack }) => {
	return (
		<ManageTagsNavBar 
			categoryIcon={categoryIcon}
			width={layoutInfo.toolbar.width}
			handlePress={onBack} />
	)
}

export default HeaderCategory;