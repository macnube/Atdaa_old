import React, { Component } from 'react';

import {
	View,
	Text,
	StyleSheet
} from 'react-native'

function ProfileHeader(props) {
	return (
		<View style={[styles.container, {backgroundColor: props.barColor}]}>
			<Text style={styles.text}>{props.text}</Text>
		</View>
	)
}

var styles = StyleSheet.create({
	container: {
		height: 30,
		marginTop: 10,
		borderColor: "white",
		borderBottomWidth: StyleSheet.hairlineWidth,
		justifyContent: "center"
	},
	text: {
		fontSize: 15,
		marginLeft: 15,
		color: "white"
	}
})

module.exports = ProfileHeader;