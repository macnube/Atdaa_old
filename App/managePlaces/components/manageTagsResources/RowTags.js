import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback
} from 'react-native'

import * as colors from '../../../resources/Colors'

import Icon from '../../../shared/Icon';


const RowTags = ({ layoutInfo, icon, handleAddRemoveTag }) => {
	console.log("icon from RowTags", icon);

	const selectedColor = icon.selected ? colors.lightMustard : 'rgb(213,213,213)'
	const styleTagContainer = {
		height: layoutInfo.searchIcon.height,
		width: layoutInfo.searchIcon.height,
		borderRadius: layoutInfo.searchIcon.height/2,
		borderColor: selectedColor
	}
	const styleRow = {
		height: layoutInfo.searchIcon.height * 1.6,
		width: layoutInfo.searchIcon.height * 1.4,
	}
	return (
		<View style={[styles.iconRow, styleRow]}>
			<TouchableWithoutFeedback
				onPress={() => handleAddRemoveTag(icon)}>
				<View style={[styles.tagContainer, styleTagContainer]}>
					<Text style={[styles.tagText, {color: selectedColor}]}>{icon.name}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	)
}

export default RowTags;

var styles = StyleSheet.create({
	iconRow: {
		margin: 5,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10
	},
	tagText: {
		fontSize: 13,
		textAlign: "center",
		backgroundColor: "transparent",
	},
	tagContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'rgb(250,250,250)',
		borderWidth: 2,
		borderColor: 'rgb(213,213,213)',
	}
})