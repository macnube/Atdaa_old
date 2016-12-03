import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback
} from 'react-native'

import Icon from '../../shared/Icon';


const IconTagSearchRow = ({ layoutInfo, icon, handleNewIcon, handleUpdateToolbar }) => {

	const styleTagContainer = {
		height: layoutInfo.searchIcon.height,
		width: layoutInfo.searchIcon.height,
		borderRadius: layoutInfo.searchIcon.height/2,
	}
	const styleRow = {
		height: layoutInfo.searchIcon.height * 1.6,
		width: layoutInfo.searchIcon.height * 1.4,
	}
	return (
		<View style={[styles.iconRow, styleRow]}>
			<TouchableWithoutFeedback
				onPress={() => handleUpdateToolbar(icon)}
				onLongPress={(e) => handleNewIcon(icon, e)}>
				<View style={[styles.tagContainer, styleTagContainer]}>
					<Text style={styles.tagText}>{icon.name}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	)
}

export default IconTagSearchRow;

IconTagSearchRow.propTypes = {
	layoutInfo: React.PropTypes.object.isRequired,
	icon: React.PropTypes.object.isRequired,
	handleNewIcon: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	iconRow: {
		margin: 5,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10
	},
	tagText: {
		color: "rgb(74,74,74)",
		fontSize: 13,
		textAlign: "center",
		backgroundColor: "transparent",
	},
	tagContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'rgb(255,255,255)',
		borderWidth: 2,
		borderColor: 'rgb(213,213,213)',
	}
})